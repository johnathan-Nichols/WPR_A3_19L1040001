const express = require ('express');
const router = express.Router();
const Question = require('../models/question')

router.get('/questions', (req, res)=>{
    Question.find().then(response=>{
        res.status(200).json(response)
    })
})

router.post('/questions', (req, res)=>{
    const question = new Question(req.body)
    question.save().then(newQuestion=>{
        res.status(201).json(newQuestion)
    })
})

router.get('/questions/:id', (req, res)=>{
    const id = req.params.id
    Question.findById(id,(err,question)=>{
        if(!question || err){
            res.sendStatus(404)
        }else{
            res.status(200).json(question)
        }
    })
})

router.put('/questions/:id', (req,res)=>{
    const id = req.params.id
    Question.findByIdAndUpdate(id, req.body, (err,question)=>{
        if(err){
            //wrong data
            res.sendStatus(400)
        }else if(!question){
            //wrong id
            res.sendStatus(404)
        }else{
            res.status(200).json(question)
        }
    })
})

router.delete('/questions/:id', (req,res)=>{
    const id = req.params.id
    Question.findByIdAndDelete(id)
        .then(res.sendStatus(200))
})

module.exports = router;