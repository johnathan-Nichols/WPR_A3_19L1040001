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
            if(resQuestion==null){
                navigate('/')
            }else{
                setQuestion({...resQuestion})
            }
        }
        load()
    },[id, loadSingleQuestion, navigate])

    function sendSubmit(){
        let errorMessage = ''        
        if(question.text.trim().length<1){
            errorMessage+='You have not typed a question.'
        }
        if(question.answers.length<1){
            if(errorMessage.length>0)errorMessage+=' '
            errorMessage+='You have not given an answer'
        }
        for(const ans of question.answers){
            if(ans.trim().length<1){
                if(errorMessage.length>0)errorMessage+=' '
                errorMessage+='All answers must have data.'
                break
            }
        }
        if(question.correctAnswer<0){
            if(errorMessage.length>0)errorMessage+=' '
            errorMessage+='Please, select a correct answer.'
        }
        if(errorMessage.length>0){
            alert(errorMessage)
            return
        } 

        if(editQuestion(question)) navigate('/')
    }
    
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
                                        console.log(question) 
                                        console.log(question.correctAnswer)
                                        console.log(index)

                                        //create new array that is safe to edit
                                        let tempArray = [...question.answers]
                                        console.log('a')

                                        //remove the question
                                        tempArray.splice(index, 1)
                                        console.log('b')

                                        //check if answerIndex is this index
                                        if(question.correctAnswer===index){
                                            setQuestion({...question, answers:tempArray, correctAnswer:-1})
                                        console.log('c')
                                            return
                                        }

                                        //if correct answer is greater than the question being deleted, remove 1
                                        if(question.correctAnswer){
                                            setQuestion({...question, answers:tempArray, correctAnswer:question.correctAnswer-1})
                                        console.log('d')
                                            return
                                        }

                                        console.log('e')
                                        //index is fine, just remove answer                                        
                                        setQuestion({...question, answers:tempArray})
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
                        <div className="btn btn-blue btn-large" onClick={()=>{sendSubmit()}}><i className="fas fa-save"></i> Save</div>
                    </div>
                </form>}
            </div>
        </main>
    )
}
