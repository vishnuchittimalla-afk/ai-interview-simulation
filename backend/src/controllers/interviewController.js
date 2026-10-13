const Interview = require("../models/Interview");
const Question = require("../models/Question");
const Response = require("../models/Response");
const mongoose = require("mongoose");


const startInterview = async (req,res) => {
    try{
        const { role , difficulty} = req.body;

        if(!role || !difficulty){
            return res.status(400).json({
                success : false,
                message : "Role and difficulty are required"
            });
        }

        const questions = await Question.find({
            difficulty : difficulty.toLowerCase()
        });

        if(questions.length<0){
            return res.status(400).json({
                success:false,
                message:"Not enough questions available for this difficulty"
            });
        }

        const shuffledQuestions = [...questions].sort(
            () => Math.random() - 0.5
         );

        const selectedQuestions = shuffledQuestions.slice(0,5);

        const interview = await Interview.create({
            user:req.user.userId,
            role,
            difficulty:difficulty.toLowerCase(),
            questions:selectedQuestions.map((question)=>question._id)
        })

        const firstQuestion = selectedQuestions[0];
        
        res.status(201).json({
            success: true,
            message: "Interview started successfully",
            interview: {
                id: interview._id,
                role: interview.role,
                difficulty: interview.difficulty,
                totalQuestions: interview.questions.length,
                currentQuestionIndex: interview.currentQuestionIndex,
                status: interview.status
            },
            question: {
                id: firstQuestion._id,
                questionText: firstQuestion.questionText,
                category: firstQuestion.category,
                difficulty: firstQuestion.difficulty
            }
        });
        

    }catch(error){
        console.error("Start interview error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while starting interview"
        });

    }
}

const submitAnswer = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { questionId, answerText } = req.body;

    // 1. Validate the submitted data
    if (!mongoose.isValidObjectId(interviewId)){
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID"
      });
    }

    if (!questionId || typeof answerText !== "string" || !answerText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question ID and answer text are required"
      });
    }

    // 2. Find the interview
    const interview = await Interview.findById(interviewId);

    if (!interview){
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    // 3. Ensure this interview belongs to the logged-in candidate
    if (interview.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot submit answers for this interview"
      });
    }

    // 4. Ensure the interview is still active
    if (interview.status !== "in-progress") {
      return res.status(400).json({
        success: false,
        message: "This interview is already completed"
      });
    }

    // 5. Identify the current question
    const currentQuestionId =
      interview.questions[interview.currentQuestionIndex];

    if (!currentQuestionId) {
      return res.status(400).json({
        success: false,
        message: "No question is available for this interview"
      });
    }

    if (
      !mongoose.isValidObjectId(questionId) ||
      currentQuestionId.toString() !== questionId
    ) {
      return res.status(400).json({
        success: false,
        message: "This is not the current interview question"
      });
    }

    // 6. Save the candidate's answer
    const response = await Response.create({
      interview: interview._id,
      question: currentQuestionId,
      user: req.user.userId,
      answerText: answerText.trim()
    });

    // 7. Move to the next question
    interview.currentQuestionIndex += 1;

    const isCompleted =
      interview.currentQuestionIndex >= interview.questions.length;

    let nextQuestion = null;

    if (isCompleted) {
      interview.status = "completed";
      interview.completedAt = new Date();
    } else {
      nextQuestion = await Question.findById(
        interview.questions[interview.currentQuestionIndex]
      );
    }

    await interview.save();

    // 8. Return the result
    return res.status(200).json({
      success: true,
      message: isCompleted
        ? "Interview completed successfully"
        : "Answer saved successfully",
      responseId: response._id,
      completed: isCompleted,
      currentQuestionIndex: interview.currentQuestionIndex,
      totalQuestions: interview.questions.length,
      nextQuestion: nextQuestion
        ? {
            id: nextQuestion._id,
            questionText: nextQuestion.questionText,
            category: nextQuestion.category,
            difficulty: nextQuestion.difficulty
          }
        : null
    });
  } catch (error) {
    console.error("Submit answer error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting answer"
    });
  }
};

module.exports = {
  startInterview,
  submitAnswer
};