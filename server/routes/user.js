const { Router } = require("express");
const router = Router();
const { userMiddleware, getuserid } = require("../middleware/user");
const { User, Test, Testattempt } = require('../db/index');
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs");
const { adminmiddleware } = require("../middleware/admin");

const {resultmain}=require('../middleware/common');
// User Routes

router.post('/signup', async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;

        // Check if all required fields are provided
        if (!email || !password || !firstname || !lastname) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" });
        }
        const encryptedpassword = await bcryptjs.hash(password, 10);
        // Create a new user
        const newUser = await User.create({
            email,
            password: encryptedpassword,
            firstname,
            lastname,
        });
        if (!newUser) {
            return res.status(500).json({ error: "Internal server error" });
        }
        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email, type: "user" }, process.env.jwtsecreate);

        // Return success response with token
        res.status(201).json({ token });
    } catch (error) {
        console.error("Error in /signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const response = await User.findOne({ email: email });
        if (response && (await bcryptjs.compare(password, response.password))) {
            const token = jwt.sign({ id: response._id, email: email, type: "user" }, process.env.jwtsecreate);
            res.json({ token: token,name:response.firstname });
        } else {
            res.status(401).json({
                resp: false,
                msg: "Please enter correct username or password"
            });
        }
    } catch (err) {
        console.error("Error in /signin:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/tests', async (req, res) => {
    const userid = await getuserid(req);
    try {
        // Implement listing all courses logic
        const response = await Test.find({}).select('-question');
        if (!userid) {
            const tests = response.map(t => {
                const startTime = new Date(t.starttime);
                const endTime = new Date(t.endtime);
                const currentTime = new Date();

                if (currentTime < startTime) {
                    return { ...t.toObject(), live: 1 }; // Test has not started yet
                } else if (currentTime > endTime) {
                    return { ...t.toObject(), live: -1 }; // Test has ended
                } else {
                    return { ...t.toObject(), live: 0 }; // Test is currently live
                }
            });

            res.json({
                tests
            });
        }
        else {
            const resp = await User.findById(userid);
            const tests = response.map(t => {
                const startTime = new Date(t.starttime);
                const endTime = new Date(t.endtime);
                const currentTime = new Date();
                const testIdString = t._id.toString(); // Convert _id to string for comparison

                if (resp.Testattempted.includes(testIdString)) {
                    // Test attempted
                    return { ...t.toObject(), live: -1 };
                } else if (currentTime < startTime) {
                    // Test has not started yet
                    return { ...t.toObject(), live: 1 };
                } else if (currentTime > endTime) {
                    // Test has ended
                    return { ...t.toObject(), live: -1 };
                } else {
                    // Test is currently live
                    return { ...t.toObject(), live: 0 };
                }
            });


            res.json({
                tests
            });
        }
    } catch (error) {
        console.error("Error in /tests:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/attendtest/:testid', userMiddleware, async (req, res) => {
    try {
        const testId = req.params.testid;
        const userid = await getuserid(req);
        const resp = await User.findOne({ _id: userid });
        if (!resp) {
            return res.status(404).json({ resp: false, msg: "You are not eligible for this test" });
        }
        const data = await Testattempt.findOne({ user: userid, testid: testId });
        if (data) {
            return res.status(400).json({ resp: false, msg: "You have already attempted this test" });
        }
        const t = await Test.findById(testId).select('-question.ANS');
        if (!t) {
            return res.status(404).json({ resp: false, msg: "Test not found" });
        }
        await User.findByIdAndUpdate({ _id: userid }, { $push: { Testattempted: testId } });
        const time = new Date();
        await Testattempt.create({ testid: testId, user: userid, time: time, duration: t.Duration });

        res.json({ resp: true, test: t });
    } catch (error) {
        console.error("Error in /attendtest:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/updateanswer", userMiddleware, async (req, res) => {
    const userid = await getuserid(req);
    const { testid, question, submitted } = req.body;

    // Validate the request body
    if (!testid || !question || !Array.isArray(question)) {
        return res.status(400).json({ resp: false, msg: "Invalid data format" });
    }

    try {
        // Upsert the user's attempt for the test
        const updatedTestAttempt = await Testattempt.findOneAndUpdate(
            { testid, user: userid },
            { $set: { testid, user: userid }, $addToSet: { question: { $each: question } } },
            { upsert: false, new: false }
        );

        if (!updatedTestAttempt) {
            return res.status(404).json({ resp: false, msg: "Test attempt not found" });
        }
        if (submitted) {
            await Testattempt.updateOne({ testid, user: userid }, { submitted });
        }
        // Update the user's score for the test
        await updateTestAttempt(testid, userid);

        res.json({ resp: true, msg: "Answers updated successfully" });
    } catch (error) {
        console.error("Error in /updateanswer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
async function updateTestAttempt(testid, userid) {
    try {
        // Find the test attempt document
        const testAttempt = await Testattempt.findOne({ testid, user: userid });

        if (!testAttempt) {
            // console.log("Test attempt not found");
            return;
        }

        // Retrieve the correct answers for the test
        const test = await Test.findById(testid).select('question');
        const questionans = test.question;

        let totalMarks = 0;

        // Iterate through each question in the test attempt
        for (let i = 0; i < testAttempt.question.length; i++) {
            const attemptQuestion = testAttempt.question[i];

            // Find the corresponding question in questionans
            const correctAnswer = questionans.find(q => q._id.equals(attemptQuestion.questionid));

            if (correctAnswer) {
                // Update the correctans field in the test attempt
                attemptQuestion.correctans = correctAnswer.ANS;

                // Check if respond and correctans are equal
                attemptQuestion.correct = attemptQuestion.respond === correctAnswer.ANS;

                // Update marks based on correctness
                if (attemptQuestion.correct) {
                    totalMarks += 1; // Increment marks for correct response
                }
            }
        }

        // Update total marks for the test attempt
        testAttempt.marks = totalMarks;

        // Save the updated test attempt
        await testAttempt.save();

        // console.log("Test attempt updated successfully");
    } catch (error) {
        console.error("Error updating test attempt:", error);
    }
}

router.get('/result/:testid', adminmiddleware, async (req, res) => {
    try {
        const userid = await getuserid(req);
        const testid = req.params.testid;
        await resultmain(req,res,userid,testid);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Call the function with testid and userid
module.exports = router;
