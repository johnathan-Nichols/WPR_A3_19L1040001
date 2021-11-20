import React, {useState, useEffect} from 'react'
import AddAnswer from './miniComponents/AddAnswer'
import { useQuestionInfo } from '../contexts/QuestionInfoProvider'

export default function Add() {
    const [text, setText] = useState('Question')
    const [answers,setAnswers] = useState(["A", "B"])
    const [answerIndex, setAnswerIndex] = useState(0)
    const {addQuestion} = useQuestionInfo()

    useEffect(()=>{
        document.title="New question | Quiz app"
    },[])

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
                                    removeThis={()=>setAnswers(answers=>(answers.filter((ans,ind)=>ind!==index)))}
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
                        <button className="btn btn-blue btn-large" onClick={()=>{addQuestion({
                            text:text,
                            answers:answers,
                            correctAnswer:answerIndex
                        });setText('');setAnswers(['A','B']);setAnswerIndex(0)}}><i className="fas fa-save"></i> Save</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
