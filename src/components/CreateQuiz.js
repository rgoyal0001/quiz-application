import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import './createQuiz.css'

async function addQuestion(body) {
    body = JSON.stringify({
        question: body
    });
    // console.log('user',user)
    const response = await fetch(
      `http://localhost:8080/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body,
      }
    )
  
    const data = await response.json();
    // console.log('body',body)
  
    return data;
  }

export default function Main() {

   const [statement,setStatement]=useState('')
   const [option1, setOption1]=useState('')
   const [option2, setOption2]=useState('')
   const [option3, setOption3]=useState('')
   const [option4, setOption4]=useState('')
   const [optionType, setQuestionType]=useState('single')
   const [answer, setAnswer]=useState('')
   const [difficulty, setDifficulty]=useState('')

   const handleSubmit=()=>{
    // e.preventDefault();

    if(!statement || !option1 || !option2 || !option3 || !option4 || !answer || !difficulty || answer>4 || answer<1 || difficulty>10 || difficulty<1){
        return alert('enter all values')
    }

    // console.log('hi')
    let options=[];
    let answers=[];
    options.push(option1,option2,option3,option4,'save and next')
    answers.push(answer-1)
    addQuestion({statement,options,optionType,answers,difficulty})
    .then((res)=>{
        alert('question added')
    })


   }
  return (
    <div className='container'>
        <h2>Add Questions</h2>

        <lebel>Question</lebel>
        <input type="text" value={statement} onChange={(e)=>setStatement(e.target.value)} placeholder='Enter Question Here'></input> <br/>

        <lebel>Option 1</lebel>
        <input type="text" value={option1} onChange={(e)=>setOption1(e.target.value)} placeholder='Enter option1 Here'></input> <br/>
        <lebel>Option 2</lebel>
        <input type="text" value={option2} onChange={(e)=>setOption2(e.target.value)} placeholder='Enter option2 Here'></input> <br/>
        <lebel>Option 3</lebel>
        <input type="text" value={option3} onChange={(e)=>setOption3(e.target.value)} placeholder='Enter option3 Here'></input> <br/>
        <lebel>Option 4</lebel>
        <input type="text" value={option4} onChange={(e)=>setOption4(e.target.value)} placeholder='Enter option4 Here'></input> <br/>
        <lebel>Question type</lebel>
        <input type="text" value={optionType}  placeholder='Enter option type as single or multiple'></input> <br/>

        <lebel>Answer</lebel>
        <input type="number" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder='Enter the correct option number 1,2,3,4'></input> <br/>

        <lebel>Difficulty Level</lebel>
        <input type="number" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} placeholder='Enter difficulty level between 1 to 10'></input> <br/>

        <button onClick={()=>handleSubmit()}>Submit</button>
    </div>
  )
}