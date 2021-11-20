import React from 'react'

export default function AddAnswer(props) {
    const value = props.value
    const onTextChange=props.onTextChange
    const index = props.index
    const onRadioChange = props.onRadioChange
    const checked=props.checked
    const removeThis=props.removeThis

    return (<div className="answer">
        <input type="text" name="answers" value={value} onChange={(event)=>{onTextChange(event.target.value)}} />
        <div onClick={()=>onRadioChange(index)}>
            <input name="correctAnswer" type="radio" value={index} id={`answer${index}`} checked={checked} readOnly/> <label htmlFor={`answer${index}`}>correct</label>
        </div>
        <button type="button" className="btn btn-orange" onClick={()=>{removeThis()}}><i className="fas fa-times"></i> Remove</button>
    </div>)
}
