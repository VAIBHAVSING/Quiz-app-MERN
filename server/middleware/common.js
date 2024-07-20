const { Admin, Class, Test, Testattempt, User } = require('../db/index');
 async function resultmain(req,res,userid,testid){
    // Fetch user's response for the test
    const response = await Testattempt.findOne({ testid, user: userid });
    const test = await Test.findById(testid);
    if (!response) {
        return res.status(404).json({ message: "Test attempt not found" });
    }

    // Fetch questions for the test
   

    // Combine response data with question data
    const combinedData = test.question.map((question, index) => {
        const userResponse = response.question.find(q => q.questionid.toString() === question._id.toString());
        return {
            question: question.Q,
            options: {
                A: question.A,
                B: question.B,
                C: question.C,
                D: question.D
            },
            selectedOption: userResponse ? userResponse.respond : null,
            correctAnswer: userResponse ? userResponse.correctans : null,
            isCorrect: userResponse ? userResponse.correct : null
        };
    });
    
    res.json({
        _id: response._id,
        isevaluated:test.isevaluated,
        title: test.Title,
        description: test.description,
        time: response.time,
        duration: response.duration,
        submitted: response.submitted,
        marks: response.marks,
        totalMarks: combinedData.length,
        question: combinedData
    });
}

 module.exports={resultmain};