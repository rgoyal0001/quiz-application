import React, { useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

export default function Quiz() {

    const [options,setOptions]=useState([])
    const [submitAns,setSubmitAns]=useState(4)
    const [question,setQuestion]=useState(async function(){
        let response=await fetch(`http://localhost:8080/api/questions`)
        .catch((err)=>{
          console.log(err)
        });
        let questions =await response.json().then(res=>{
            let questionList=res.filter(e=>e.difficulty == 5);
            let que=questionList[Math.floor(Math.random()*questionList.length)]
            return que
        })

        
    }())
    const [score,setScore]=useState(0)
    const [correct,setCorrect]=useState(0)
    const [wrong,setWrong]=useState(0)
    const [count,setCount]=useState(0)
    const [difficultyLevel,setdifficultyLevel]=useState(1)
    const [answer,setAnswer]= useState(question?question.answers:[])
    async function getQuestions(level){
        const response=await fetch(`http://localhost:8080/api/questions`)
        .catch((err)=>{
          console.log(err)
        });
        const questions =await response.json().then(res=>{
            let questionList=res.filter(e=>e.difficulty == level);
            let que=questionList[Math.floor(Math.random()*questionList.length)]
            setQuestion(que)
            setOptions(que.options)
            setAnswer(que.answers)
            // console.log(level,que)
        })

      }

   

      async function nextQuestion(level){
        const check=checkAns(submitAns)
        
        level=level+check;
        if(check==1){
            setCorrect((p)=>p+1)
            setScore((p)=>p+5)
        }
        if(check ==-1){
            setWrong((p)=>p+1)
            setScore((p)=>p-2)
        }

        setdifficultyLevel(level)
        getQuestions(level)
        setCount((p)=>p+1)
        setSubmitAns(4)

      }

      const handleChange=(e)=>{
        console.log(e)
        setSubmitAns(e)
      }

      const checkAns=(val)=>{
        if(val!=4){
            if(answer[0]==val)
                return 1
            else return -1
        }
        else return 0
      }

      
      if(count>=10 || difficultyLevel<=0 ){
        saveResult(correct,wrong,score)
        return <Navigate to={'/result'} replace={true}></Navigate>
        }

        async function saveResult(body){
            
        }


// console.log("question",options)


    return (
        
        <>
        <p>click on next for the next question</p>
            <div style={{display:'flex', gap:'20px'}}>
                <p>Difficulty Level - {difficultyLevel}</p>
   
                <p>Score - {score}</p>
            </div>
            <h2>{count} - {question.statement}</h2>
            
            <ol style={{width:'30%'}}>
                <li><input type="radio"value={false} name="options" onChange={()=>handleChange('0')} style={{width:'5%'}}/><label>{options[0]}</label></li>
                <li><input type="radio"value={false} name="options" onChange={()=>handleChange('1')} style={{width:'5%'}}/><label>{options[1]}</label></li>
                <li><input type="radio"value={false} name="options" onChange={()=>handleChange('2')} style={{width:'5%'}}/><label>{options[2]}</label></li>
                <li><input type="radio"value={false} name="options" onChange={()=>handleChange('3')} style={{width:'5%'}}/><label>{options[3]}</label></li>
                <li><input type="radio"value={false} name="options" onChange={()=>handleChange('4')} style={{width:'5%'}}/><label>{options[4]}</label></li>
            </ol>
        <button onClick={()=>nextQuestion(difficultyLevel)}>Next</button>

            

        </>
    )
}