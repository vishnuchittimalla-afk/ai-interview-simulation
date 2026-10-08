const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionText:{
        type:String,
        require:true,
        trim:true
    },
    category:{
        type:String,
        require:true,
        trim:true
    },difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        require:true
    },expectedKeywords:{
        type:[String],
        default:[]
    },
    expectedConcepts:{
        type:[String],
        default:[]
    }
},{timestamps:true});

const Question = mongoose.model("Question",questionSchema);

module.exports = Question;

