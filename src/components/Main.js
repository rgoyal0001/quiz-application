import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../styles/Main.css'

export default function Main() {

    const inputRef = useRef(null)
    const dispatch = useDispatch()


    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

  return (
    <div className='container'>
        
        <h1 >Quiz Application</h1>

        <ol> Instructions:-
            <li>You will be asked 10 questions one after another.</li>
            <li>5 points is awarded for the correct answer.</li>
            <li>2 marks will be deducted for wrong answer.</li>
            <li>Each question has five options (fifth option is 'save and next')</li>
            <li>If you are not sure to select first four options then you should select the five option.</li>
            <li>If you are not able to solve the level 1 answer then the quix will end.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>

    </div>
  )
}