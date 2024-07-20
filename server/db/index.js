const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.mongodburl);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstname: {
        type: String,
        maxLength: 20,
        required: true
    },
    lastname: {
        type: String,
        maxLength: 20,
        required: true,
    },
    Testcreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }],

});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstname: {
        type: String,
        maxLength: 20,
        required: true
    },
    lastname: {
        type: String,
        maxLength: 20,
        required: true,
    },
    Testattempted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }]
});
const ClassSchema = new mongoose.Schema({
    classname: {
        type: String,
        require: true
    },
    classteacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    testid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }
})

const questionSchema = new mongoose.Schema({
    Q: {
        type: String,
        require: true
    },
    ANS: {
        type: String,
        require: true
    },
    A: String,
    B: String,
    C: String,
    D: String,
})

const TestSchema = new mongoose.Schema({
    // Schema definition here
    Title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    },
    Duration: {
        type: Number,
        required: true,
    },
    obtainmarks: {
        type: Number
    },
    isevaluated: {
        type: Boolean,
        default: false
    },
    question: [questionSchema],

});
const respondquestionSchema = new mongoose.Schema({
    questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    respond: {
        type: String,
        required: true
    },
    correctans: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean
    }
})
const TestattemptSchema = new mongoose.Schema({
    testid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: String,

    },
    duration: {
        type: Number,

    },
    submitted: {
        type: Boolean,
        default: false
    },
    marks: {
        type: Number
    },
    question: [
        respondquestionSchema
    ]
})
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

const contactform = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    }})
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Test = mongoose.model('Test', TestSchema);
const Class = mongoose.model('Class', ClassSchema);
const Testattempt = mongoose.model("Testattempt", TestattemptSchema)
const Otp = mongoose.model("Otp", otpSchema)
const Form=mongoose.model('Form',contactform);
module.exports = {
    Admin,
    User,
    Test,
    Class,
    Testattempt,
    Otp,Form
}