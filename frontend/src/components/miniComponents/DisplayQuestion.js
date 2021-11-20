import React from 'react'

export default function DisplayQuestion(props) {
    const index = props.index
    const question = props.question

    return (
        <tr>
            <td>{index+1}</td>
            <td>{question.text}</td>
            <td>{question.answers[question.correctAnswer]}</td>
            <td>
                <a href={`/edit/${question._id}`} className="btn btn-blue"><i className="far fa-edit"></i> Edit</a>
                <a href={`/sendDelete/${question._id}`} className="btn btn-orange"><i className="far fa-trash-alt"></i> Delete</a>
            </td>
        </tr>
    )
}
