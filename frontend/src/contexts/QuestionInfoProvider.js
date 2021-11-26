import React, {useContext, useEffect, useCallback} from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios"

const QuestionInfoContext = React.createContext()

export function useQuestionInfo(){
    return useContext(QuestionInfoContext)
}

export function QuestionInfoProvider({children}){
    const [questions, setQuestions] = useLocalStorage('questions', [])

    const loadQuestions = useCallback(async ()=>{
        try{
            const response = await axios.get("/questions")
            setQuestions(response.data)
        }catch(err){
            setQuestions(null)
        }
    },[setQuestions])

    //runs on page load
    useEffect(()=>{
        loadQuestions()
    },[loadQuestions])

    async function loadSingleQuestion(id){
        try{
            const response = await axios.get(`/questions/${id}`)
            return response.data
        }catch(err){
            alert('This question could not be found. Please double check the Id entered.')
            return null
        }
    }

    async function addQuestion(question){
        try{
            await axios.post("/questions", question)
            alert(`Successfully added question: ${question.text}`)
            loadQuestions()
            return true
        }catch(err){
            alert('Add had an issue, question may not have been added. Please refresh this webpage.')
            return false
        }
    }

    async function editQuestion(question){
        try{
            await axios.put(`/questions/${question._id}`, question)
            alert(`Successfully edited question: ${question.text}`)
            loadQuestions()
            return true
        }catch(err){
            alert('Edit had an issue, question may not have been edited. Please refresh this webpage.')
            return false
        }
    }

    async function sendDelete(id){
        try{
            await axios.delete(`/questions/${id}`)
            alert(`Successfully deleted question.`)
        }catch(err){
            alert('Delete had an issue, question may not have been deleted. Please refresh this webpage.')
        }
        loadQuestions()
    }

    const value = {
        questions,
        loadSingleQuestion,
        addQuestion,
        editQuestion,
        sendDelete
    }

    return(
        <QuestionInfoContext.Provider value={value}>
            {children}
        </QuestionInfoContext.Provider>
    )
}