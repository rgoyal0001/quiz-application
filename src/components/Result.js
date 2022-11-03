import React, { useEffect, useState } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';


export default function Result() {

    const [result,setResult] = useState([])


    async function getResult(){
        const response=await fetch(`http://localhost:8080/api/result`)
        .catch((err)=>{
          console.log(err)
        });
        const result =await response.json().then(res=>{
            let r=res.filter(e=>e.username=='abc')
            setResult(r)
            
        })

      }
      useEffect(()=>{
              getResult()

      },[])
      


     return(
        <div>
            <p>name - {result[0].username}</p>
            <p>correct answers - {result[0].correct}</p>
            <p>wrong answers - {result[0].wrong}</p>
            <p>score - {result[0].score}</p>
            <Link to={'/'}>go to home</Link>
        </div>
     )
}