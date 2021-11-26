import React from 'react'
import {useQuestionInfo} from "../../contexts/QuestionInfoProvider"

export default function DisplayQuestion(props) {
    const index = props.index
    const question = props.question
    const {sendDelete} = useQuestionInfo()
  

    return (
        <tr>
            <td>{index+1}</td>
            <td>{question.text}</td>
            <td>{question.answers[question.correctAnswer]}</td>
            <td>
                <a href={`/edit/${question._id}`} className="btn btn-blue"><i className="far fa-edit"></i> Edit</a>
                <div href='#' onClick={()=>{
                    if(window.confirm(`Are you sure that you want to delete "${question.text}"?`)) sendDelete(question._id)
                }} className="btn btn-orange"><i className="far fa-trash-alt"></i> Delete</div>
            </td>
        </tr>
    )
}
