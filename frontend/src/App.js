import React from "react";
import {BrowserRouter as Router, Route, Routes, useParams, useNavigate} from 'react-router-dom';
import Main from "./components/Main";
import Aside from "./components/Aside";
import Transfer from "./Transfer";
import Add from "./components/Add";
import Edit from "./components/Edit";
import { QuestionInfoProvider,useQuestionInfo } from "./contexts/QuestionInfoProvider";

export default function App() {
  function SendDelete(){
    const { id } = useParams()
    const {sendDelete} = useQuestionInfo()
    const navigate = useNavigate();

    sendDelete(id)
    navigate('/')
  }

  return (<Router>
    <Aside/>
    <QuestionInfoProvider>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        
        <Route exact path="/add" element={<Add/>}/>
        
        <Route exact path="/edit/:id" element={<Edit/>}/>

        <Route exact path="/sendDelete/:id" element={<SendDelete/>}/>

        <Route path="/" element={<Transfer loc={"/"} />}/>
      </Routes>
    </QuestionInfoProvider>
  </Router>)
}
