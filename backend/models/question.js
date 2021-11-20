const {Schema, model} = require('mongoose')

const Question = new Schema({
    text:String,
    answers:[String],
    correctAnswer:Number,
})

module.exports = model("Question", Question)