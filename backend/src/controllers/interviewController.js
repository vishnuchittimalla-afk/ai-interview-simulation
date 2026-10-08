const Interview = require("../models/Interview");
const Question = require("../models/Question");

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

        if(questions.length<5){
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

        

    }catch(error){

    }
}