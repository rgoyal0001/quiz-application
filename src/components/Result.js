import React, { useEffect, useState } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Result() {

    const [result,setResult] = useState()
    const navigate = useNavigate();


    async function handleClick(){
      console.log('delete results')
      const response=await fetch(`http://localhost:8080/api/result`,{
        method:'DELETE',
        headers: {
          'Content-Type': "application/json"
        }
      })
      console.log('done')

      navigate('/main')

      

    }


    async function getResult(){
        const response=await fetch(`http://localhost:8080/api/result`)
        .catch((err)=>{
          console.log(err)
        });
        const result =await response.json()
        .then((res)=>{
          console.log(res[0].score)
            setResult(res)
        })            
            
        }

      
      useEffect(()=>{
        getResult()
      },[])
      
console.log("result",result[0].correct)

     return(
        <div>
            <p>correct answers - {result[0].correct}</p>
            <p>wrong answers - {result[0].wrong}</p>
            <p>score - {result[0].score}</p>
            <button onClick={()=>handleClick()}>go to home</button>
        </div>
     )
}