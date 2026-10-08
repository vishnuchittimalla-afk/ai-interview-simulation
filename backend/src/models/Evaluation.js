const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    response:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Response",
        require:true,
        unique:true
    },
    relevanceScore:{
        type:Number,
        min:0,
        max:100
    },
    keywordScore:{
        type:Number,
        min:0,
        max:100
    },
    keywordScore:{
        type:Number,
        min:0,
        max:100
    },
    completenessScore:{
        type: Number,
        min: 0,
        max: 100
    },
    clarityScore: {
            type: Number,
            min: 0,
            max: 100
    },
    overallScore: {
        type: Number,
        min: 0,
        max: 100
    },
    feedback:{
        type:String,
        default:""
    },
},{ timestamps : true });

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;
