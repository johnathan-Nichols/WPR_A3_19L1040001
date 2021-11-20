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
        const response = await axios.get("/questions")
        setQuestions(response.data)
    },[setQuestions])

    //runs on page load
    useEffect(()=>{
        loadQuestions()
    },[loadQuestions])

    async function loadSingleQuestion(id){
        const response = await axios.get(`/questions/${id}`)
        return response.data
    }

    async function addQuestion(question){
        await axios.post("/questions", question)
        loadQuestions()
    }

    async function editQuestion(question){
        await axios.put(`/questions/${question._id}`, question)
        loadQuestions()
    }

    async function sendDelete(id){
        await axios.delete(`/questions/${id}`)
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