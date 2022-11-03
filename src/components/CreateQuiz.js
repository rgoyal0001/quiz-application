import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'

export default function Main() {

   const [statement,setStatement]=useState('')
  return (
    <div className='container'>
        <h2>Add Questions</h2>
        <input type="text" value={statement} onChange={(e)=>e.target.value} placeholder='Enter Question Here'></input>
    </div>
  )
}