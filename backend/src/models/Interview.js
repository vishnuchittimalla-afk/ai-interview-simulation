const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    role:{
        type:String,
        require:true,
        trim:true
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        require:true
    },
    questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }
    ],
    currentQuestionIndex:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:["in-progress","completed"],
        default:"in-progress"
    },
    score:{
        type:Number,
        default:null
    },startedAt:{
        type:Date,
        default:Date.now
    },completedAt:{
        type:Date,
        default:null
    }
},{ timestamps: true});

const Interview = mongoose.model("Interview",interviewSchema);

module.exports = Interview;
