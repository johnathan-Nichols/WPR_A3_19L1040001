import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import AddAnswer from './miniComponents/AddAnswer'
import { useQuestionInfo } from '../contexts/QuestionInfoProvider'

export default function Add() {
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [answers,setAnswers] = useState([''])
    const [answerIndex, setAnswerIndex] = useState(-1)
    const {addQuestion} = useQuestionInfo()

    useEffect(()=>{
        document.title="New question | Quiz app"
    },[])

    function sendSubmit(){
        let errorMessage = ''        
        if(text.trim().length<1){
            errorMessage+='You have not typed a question.'
        }
        if(answers.length<1){
            if(errorMessage.length>0)errorMessage+=' '
            errorMessage+='You have not given an answer'
        }
        for(const ans of answers){
            if(ans.trim().length<1){
                if(errorMessage.length>0)errorMessage+=' '
                errorMessage+='All answers must have data.'
                break
            }
        }
        if(answerIndex<0){
            if(errorMessage.length>0)errorMessage+=' '
            errorMessage+='Please, select a correct answer.'
        }
        if(errorMessage.length>0){
            alert(errorMessage)
            return
        } 

        if(addQuestion({
            text:text,
            answers:answers,
            correctAnswer:answerIndex
        })) navigate('/')
    }

    return (
        <main>
            <div className="container">
                <h1>New question</h1>
                <form id="frm-create">
                    <div className="form-group">
                        <label htmlFor="text">Text</label>
                        <input type="text" name="text" value={text} onChange={(event=>{setText(event.target.value)})} />
                    </div>
                    
                    <div className="form-group">
                        <label>Answers: </label>
                        {answers!=null && answers.map((answer, index)=>{
                            return (
                                <AddAnswer
                                    key={`answer${index}`}
                                    value={answer}
                                    index={index}
                                    checked={answerIndex===index?'checked':''}
                                    onTextChange={(newValue)=>{
                                        let tempArray = [...answers]
                                        tempArray[index]=newValue
                                        setAnswers(tempArray)
                                    }}
                                    onRadioChange={()=>setAnswerIndex(index)}
                                    removeThis={()=>{
                                        //check if answerIndex === this index
                                        if(answerIndex===index){
                                            setAnswerIndex(-1)
                                        }
                                        //answerIndex is greater than index, remove 1 
                                        else if(answerIndex>index){
                                            setAnswerIndex(answerIndex=>answerIndex--)
                                        }

                                        //remove answer from the set of answers
                                        setAnswers(answers=>(answers.filter((ans,ind)=>ind!==index)));
                                    }}
                                />
                            )
                        })}
    
                        <div className="text-right">
                            <button type="button" className="btn btn-blue" onClick={()=>{
                                let tempArray = [...answers]
                                tempArray.push('')
                                setAnswers(tempArray)
                            }}><i className="fas fa-plus"></i> Add</button>
                        </div>
                    </div>
    
                    <div className="actions">
                        <div className="btn btn-blue btn-large" onClick={()=>{sendSubmit()}}><i className="fas fa-save"></i> Save</div>
                    </div>
                </form>
            </div>
        </main>
    )
}
