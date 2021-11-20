import React, {useEffect, useState} from 'react'
import DisplayQuestion from './miniComponents/DisplayQuestion'
import { useQuestionInfo } from '../contexts/QuestionInfoProvider'

export default function Main() {
    const [search, setSearch] = useState('')
    const {questions} = useQuestionInfo()
    const [sortedQuestions, setSortedQuestions] = useState()

    useEffect(()=>{
        document.title="All questions | Quiz app"
        setSortedQuestions(questions.slice())
    },[questions])

    useEffect(()=>{
        //slice is needed so we don't overwrite the localStorage
        const tempQuestions = questions.slice()
        setSortedQuestions(tempQuestions.map((quest)=>{
            if(quest.text.toLowerCase().includes(search.toLowerCase())){
                return quest
            }else{
                return null
            }
        }))
    },[search, questions])

    return (<>
      <main>
          <div className="container">
              <h1>All questions</h1>
  
              <div id="search">
                  <input type="text" placeholder="Search..." value={search} onChange={(event)=>{setSearch(event.target.value)}}/>
              </div>
  
              <table>
                <thead>
                  <tr>
                      <th>#</th>
                      <th>Question</th>
                      <th>Answer</th>
                      <th width="210">Actions</th>
                  </tr>
                </thead>
      
                <tbody>
                    {sortedQuestions!=null && sortedQuestions.map((question,index)=>{
                        if(question==null)return null
                        return <DisplayQuestion
                            key={`displayQuestion${index}`}
                            index={index}
                            question={question}
                        />
                    })}
                </tbody>
      
              </table>
          </div>
      </main>
    </>)
}
