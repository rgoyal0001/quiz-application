import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css';
import {LoginContext} from '../../Context/Login/LoginContext';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
 const [email, setEmail] = React.useState('');
 const [password, setPassword] = React.useState('');
 const [loading , setLoading] = React.useState(false);
 const [error , setError] = React.useState(false);
  // const {setUser} = React.useContext(LoginContext);

  // let {proceed} = React.useContext(PaymentContext);
  const navigate = useNavigate();

  let localToken = localStorage.getItem('token');

  // console.log(localToken)
async function getUser(email,password){
  const response = await fetch(`http://localhost:8080/api/user`)
  .catch((err)=>{
    console.log(err)
  });
  const users =await response.json().then(res=>{
    let user=res.filter(e=>e.email==email)
    if(user){
      if(user[0].password==password)
        return true
    }
    else return false
    
    
})

}
  const handleLogin =  (e) => {
      e.preventDefault();

    if(getUser(email,password)){
      alert('login successful')
      navigate('/main')
    }
    else alert('check login details')
  
  }


    //   console.log(token);
    //    console.log(response)
    //   if(response.error) {
    //     return alert(response.error)
    // }
    //   let token = response.token;
    //   console.log(token)
      
    //   if(localToken){
    //       if(localToken === token){
    //           return alert("you are already logged in")
    //       }else {  
    //       return alert("You need to logout first !")
    //       }
    //   }

    //   alert('login success');
    //   //  window.location.reload()
     
    //   localStorage.setItem('token', token);
    //   // setUser(token);

      
    //   window.location.reload()
      

    // } catch (error) {
    //     setError(true)
    //   console.log(error);
    // }
  // }



  

// if(error){
//     return(
//                 <h1 
//               textAlign = "center" 
//               marginTop = "200px"
//               color = "red"
//           >Something Went Wrong...</h1>
         
//     )
// }

  return (
    <div className='login'>
      <div className='left'>
        <form  className='login-form' onSubmit={handleLogin}>
          <h1>Student Login</h1>
          or <Link to='/registerUser' style={{"color":"rgb(29, 177, 29) ","fontWeight":"650"}}>create your account</Link>
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

export default LoginUser