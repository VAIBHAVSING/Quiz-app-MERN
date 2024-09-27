const express = require("express");
const { adminmiddleware, getusername } = require('../middleware/admin')
const app = express();
require('dotenv').config();
const { Admin, Class, Test, Testattempt, User, Otp } = require('../db/index');
const zod = require('zod')
const { default: mongoose, Mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { getuserid } = require("../middleware/user");
const { resultmain } = require('../middleware/common');
const sendOtp = require('../middleware/otp')
// Admin Routes
app.post('/signup', async (req, res) => {
    const zodschema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6, { message: "password must contain 6 letters" }),
        firstname: zod.string().max(20, { message: "first name must contain at most letter" }),
        lastname: zod.string().max(20),
    })
    try {
        const { email, password, firstname, lastname } = req.body;
        const validationResult = zodschema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.errors });
        }

        // Check if all required fields are provided
        if (!email || !password || !firstname || !lastname) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the email already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" });
        }
        const encryptedpassword = await bcryptjs.hash(password, 10);
        // Create a new user
        const newUser = await Admin.create({
            email,
            password: encryptedpassword,
            firstname,
            lastname,
        });
        if (!newUser) {
            res.status(500).json({ msg: "internal server error" })
        }
        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email, type: "admin" }, process.env.jwtsecreate);

        // Return success response with token
        res.json({ token });
    } catch (error) {
        console.error("Error in /signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const response = await Admin.findOne({ email: email });
        if (response && (await bcryptjs.compare(password, response.password))) {
            const token = await jwt.sign({ id: response._id, email: email, type: "admin" }, process.env.jwtsecreate);
            res.json({ token: token, name: response.firstname });
        }
        else {
            res.status(401).json({
                resp: false,
                msg: "Please enter correct username or password"
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
app.put("/update", adminmiddleware, async (req, res) => {
    try {
        const origionalusername = await getusername(req);
        const { username, password, firstname, lastname } = req.body;
        if (username) {
            await Admin.findOneAndUpdate({ username: origionalusername }, { username: username });
            const token = await jwt.sign({ username: username }, process.env.jwtsecreate);
            res.json({
                status: true,
                msg: "updation successful",
                token: token
            })
        }
        if (password) {
            await Admin.findOneAndUpdate({ username: origionalusername }, { password: password });
            res.json({
                status: true,
                msg: "updation successful"
            })
        }
        if (firstname) {
            await Admin.findOneAndUpdate({ username: origionalusername }, { firstname: firstname });
            res.json({
                status: true,
                msg: "updation successful"
            })
        }
        if (lastname) {
            await Admin.findOneAndUpdate({ username: origionalusername }, { lastname: lastname });
            res.json({
                status: true,
                msg: "updation successful"
            });
        }
    }
    catch (err) {
        res.json({
            status: false,
            msg: "updation failed"
        })
        console.log(err);
    }
});


app.post('/createclass', adminmiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const classname = req.body.classname;
        const email = await getusername(req);
        const user1 = await Admin.findOne({ email: email }).session(session);
        if (!user1) {
            throw new Error('User not found');
        }

        const classresp = await Class.create(
            [{ classname: classname, classteacher: user1._id }],
            { session: session }
        );

        const response = await Admin.findOneAndUpdate(
            { email: email },
            { classcreated: classresp[0]._id },
            { session: session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'Class created successfully', class: classresp[0] });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error creating class:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/createtest", adminmiddleware, async (req, res) => {
    try {
        // const { title, description, Duration, starttime, endtime,question} = req.body;
        const jsonData = req.body;
        // Create a new test
        const id = await getuserid(req);
        const newTest = await Test.create(jsonData);

        // Save the newTest instance to the database
        const resp = await Admin.findOneAndUpdate({ _id: id }, { $push: { Testcreated: newTest._id } });
        // Update the corresponding class with the newly created test


        res.status(200).json({ status: true, message: "Test created successfully", test: resp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

app.post('/addquestion', adminmiddleware, async (req, res) => {
    try {
        const { testid, statement, answer, options } = req.body;

        // Create a new question object
        const newQuestion = { statement, answer, options };

        // Find the test by its ID and update it to add the new question to the questions array
        const updatedTest = await Test.findByIdAndUpdate(
            testid,
            { $push: { question: newQuestion } }, // Ensure 'question' is the correct field name in the schema
            { new: true }
        );

        res.status(200).json({ message: "Question added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/classes', adminmiddleware, async (req, res) => {
    try {
        const email = await getusername(req);

        // Find the admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const classes = await Class.findById({ _id: admin.classcreated });

        res.status(200).json({ classes: classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//http://localhost:3000/tests/615366c13ccf3f847e26a51a

// Route to get all tests by providing class ID
app.get('/tests/:classId', async (req, res) => {
    try {
        const classId = req.params.classId;

        // Find the class by ID
        const foundClass = await Class.findById(classId);

        if (!foundClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Find the associated test using the testid field in the Class schema
        const tests = await Test.find({ _id: foundClass.testid }).select("-question");

        res.status(200).json({ tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to get questions of a test by providing test ID
app.get('/questions/:testId', async (req, res) => {
    try {
        const testId = req.params.testId;

        // Find the test by ID
        const questions = await Test.findById(testId, { question: { answer: 0 } }).select("question");

        if (!questions) {
            return res.status(404).json({ message: "Test not found" });
        }

        res.status(200).json({ questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.get('/mytest', adminmiddleware, async (req, res) => {
    try {
        const userid = await getuserid(req);

        // Find the admin by user ID and select the Testcreated field
        const admin = await Admin.findById(userid).select('Testcreated');

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const testIds = admin.Testcreated;

        // Find all tests with the IDs in the Testcreated array
        const tests = await Test.find({ _id: { $in: testIds } }).select('-question');

        res.status(200).json({ tests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.get('/Testresult/:testId', async (req, res) => {
    try {
        const testId = req.params.testId;
        const test = await Test.findById(testId).select('-question');
        const t = await Test.findById(testId).select('question');
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }

        // Fetching student marks
        const resp = await Testattempt.find({ testid: testId }).select('user marks -_id');

        // Sorting student marks
        const sortedData = resp.sort((a, b) => a.marks - b.marks);

        // Fetching first name and last name from User table based on _id
        const studentNames = await Promise.all(sortedData.map(async (item) => {
            const user = await User.findById(item.user).select('firstname lastname email');
            return { name: `${user.firstname} ${user.lastname}`, email: `${user.email}`, marks: item.marks };
        }));

        // Total marks calculation
        const totalMarks = t.question.length;

        res.json({ totalmarks: totalMarks, studentmarks: studentNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/evaluated/:testid', adminmiddleware, async (req, res) => {
    try {
        const testid = req.params.testid;
        const resp = await Test.findOneAndUpdate({ _id: testid }, { isevaluated: true });
        res.json({ msg: "evaluated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
app.post('/deletetestrecord', adminmiddleware, async (req, res) => {

    const { email, testid } = req.body;
    const user = await User.find({ email });
    if (!(email || testid)) {
        return res.status(400).json({ message: "Bad Request" });
    }
    try {
        const response = await Testattempt.findOneAndDelete({ user, testid: testid });
        const resp = await User.updateOne({ email }, {
            $pull: {
                Testattempted: testid
            }
        })
        if (response) {
            return res.status(200).json({ message: "Test record deleted successfully" });
        } else {
            return res.status(404).json({ message: "Test record not found" });
        }
    } catch (error) {
        console.error("Error deleting test record:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/userresult', adminmiddleware, async (req, res) => {
    try {
        const { email, testid } = req.body;
        const user = await User.findOne({ email });
        const userid = user._id;

        resultmain(req, res, userid, testid);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

})
app.post('/generateotp', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Bad Request" });
        }
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const response = await sendOtp(email);
        if (response) {
            return res.status(200).json({ message: "OTP sent successfully" });
        } else {
            console.log(response)
            return res.status(500).json({ message: "Internal server error" });
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})
app.post('/verifyotp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Bad Request" });
        }

        const response = await Otp.findOne({email, otp});
        if (response) {
            return res.status(200).json({ message: "OTP verified successfully" });
        } else {
            console.log(response)
            return res.status(411).json({ message: "Incorrect otp" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = app;
