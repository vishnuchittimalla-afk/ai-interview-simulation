const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
    interview:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Interview",
        require:true
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    answerText:{
        type:String,
        require:true,
        trim:true
    },
    submittedAt:{
        type:Date,
        default:Date.now
    },
},{ timestamps : true});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
