import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css';
// import {LoginContext} from '../../Context/Login/LoginContext';
import { useNavigate } from 'react-router-dom';


function LoginAdmin() {
 const [email, setEmail] = React.useState('');
 const [password, setPassword] = React.useState('');
 const [loading , setLoading] = React.useState(false);
 const [error , setError] = React.useState(false);
  // const {setUser} = React.useContext(LoginContext);

  const navigate = useNavigate();

  let localToken = localStorage.getItem('token');

  console.log(localToken)

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    const body = {
      email,
      password
    }
    // console.log(body);
    try {
         setLoading(true)
      let data = await fetch('http://localhost:8080/loginAdmin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      let response = await data.json();
        setLoading(false)
      // console.log(token);
       console.log(response)
      if(response.error) {
        return alert(response.error)
    }
      let token = response.token;
      console.log(token)
      
      if(localToken){
          if(localToken === token){
              return alert("you are already logged in")
          }else {  
          return alert("You need to logout first !")
          }
      }

      alert('login success');
      //  window.location.reload()
     
      localStorage.setItem('token', token);
      // setUser(token);

      //  if(proceed){
      //     console.log(proceed);
      // // navigate("/goal/payment")
      // }else {  
      //   navigate('/');
      // }

      window.location.reload()
      

    } catch (error) {
        setError(true)
      console.log(error);
    }
  }



  

if(error){
    return(
                <h1 
              textAlign = "center" 
              marginTop = "200px"
              color = "red"
          >Something Went Wrong...</h1>
         
    )
}

  return (
    <div className='login'>
      <div className='left'>
        <form  className='login-form' onSubmit={handleLogin}>
          <h1>Admin Login</h1>
          or <Link to='/registerAdmin' style={{"color":"rgb(29, 177, 29) ","fontWeight":"650"}}>create your account</Link>
          <br />
          <div id='input' >
            <input type="text" name="email" placeholder='Enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}} /> <br />
            <input type="password" name="password" placeholder='Enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <div id='login-button' style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
          <input type="submit" value="Login" />

          </div>
        </form>
      </div>

   
    </div>
  )
}

export default LoginAdmin