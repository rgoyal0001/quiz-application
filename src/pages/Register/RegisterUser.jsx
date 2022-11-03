import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { useNavigate } from 'react-router-dom';
// import {Spinner , Center ,ChakraProvider} from "@chakra-ui/react";


async function register(body) {
  body = JSON.stringify({
    user: body
  });
  // console.log('user',user)
  const response = await fetch(
    `http://localhost:8080/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body,
    }
  )

  const data = await response.json();
  console.log('body',body)

  return data;
}

function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading , setLoading] = React.useState(false);
  const [error , setError] = React.useState(false);
  const navigate = useNavigate();

  let token = localStorage.getItem('token');


  const handleRegister =  (e) => {
    e.preventDefault();
    setLoading(true)

    register({name,email,password})
    .then((res)=>{
      if(token){
        return alert("You need to logout first !")
      }
       if(res.error) {
           return alert(res.error)
       }
      alert("Registration successful")
      navigate('/loginUser')
    })
    .catch(err=>{
        setError(true)
    })
    .finally(() => {
         setLoading(false)
    })
  }


if(error){
  // console.log(error)
    return(
                <h1 
              textAlign = "center" 
              marginTop = "200px"
              color = "red"
          >Something Went Wrong...</h1>
         
    )
}



  return (
    <div className="register">
    <div className='left'>
      <form className='register-form' onSubmit={handleRegister}>
        <h1>Register as Student</h1>
        or <Link to='/loginUser' style={{"color":"rgb(29, 177, 29) ","fontWeight":"650"}}>login to your account</Link>
        <br />
        <input placeholder='Enter your name'  type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/> <br />
        <input placeholder='Enter your email' type="text" name="username" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> <br />
        <input placeholder='Create password' type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/> <br />
        <div id='register-button' style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
            <input type="submit" value="Register"/>
        </div>
      </form>
    
      
      </div>

    
    </div>

  )
}

export default Register