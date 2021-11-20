import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import { useQuestionInfo } from '../contexts/QuestionInfoProvider';
import AddAnswer from './miniComponents/AddAnswer';

export default function Edit() {
    const { id } = useParams()
    const { loadSingleQuestion,editQuestion } = useQuestionInfo()
    const [question, setQuestion] = useState()
    const navigate = useNavigate();

    useEffect(()=>{
        document.title="Edit question | Quiz app"
        async function load(){
            const resQuestion = await loadSingleQuestion(id)
            setQuestion({...resQuestion})
        }
        load()
    },[id, loadSingleQuestion])

    return (
        <main>
            <div className="container">
                <h1>Edit question</h1>
                {question!=null && <form id="frm-create">
                    <div className="form-group">
                        <label htmlFor="text">Text</label>
                        <input type="text" name="text" value={question.text} onChange={(event)=>{setQuestion({...question, text:event.target.value})}}/>
                    </div>
                    
                    <div className="form-group">
                        <label>Answers: </label>
                        {question.answers!=null && question.answers.map((answer, index)=>{
                            return (
                                <AddAnswer
                                    key={`answer${index}`}
                                    value={answer}
                                    index={index}
                                    checked={question.correctAnswer===index?'checked':''}
                                    onTextChange={(newValue)=>{
                                        let tempArray = [...question.answers]
                                        tempArray[index]=newValue
                                        setQuestion({...question, answers:tempArray})
                                    }}
                                    onRadioChange={()=>setQuestion({...question, correctAnswer:index})}
                                    removeThis={()=>{
                                        let tempArray = [...question.answers]
                                        tempArray.splice(index, 1)
                                        if(question.correctAnswer >= tempArray.length){
                                            setQuestion({...question, answers:tempArray, correctAnswer:tempArray.length===0?0:tempArray.length-1})
                                        }else{
                                            setQuestion({...question, answers:tempArray})
                                        }
                                    }}
                                />
                            )
                        })}
    
                        <div className="text-right">
                            <button type="button" className="btn btn-blue" onClick={()=>{
                                let tempArray = [...question.answers]
                                tempArray.push('')
                                setQuestion({...question, answers:tempArray})
                            }}><i className="fas fa-plus"></i> Add</button>
                        </div>
                    </div>
    
                    <div className="actions">
                        <button className="btn btn-blue btn-large" onClick={()=>{
                            editQuestion(question)
                            navigate('/')
                        }}><i className="fas fa-save"></i> Save</button>
                    </div>
                </form>}
            </div>
        </main>
    )
}
