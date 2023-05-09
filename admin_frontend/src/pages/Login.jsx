import React,{useState} from 'react'
import axios from 'axios'
import './Login.css'
import {backendApi} from '../common/common';

export default function Login() {

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin=(e)=>{
    e.preventDefault(); 
    const userName=document.getElementById('username').value;
    const password=document.getElementById('pwd').value;

    const loginInfo={
      userName,
      password
    }


    if(confirm("login confirm")){
      setLoading(true);
      axios
        .post(`${backendApi}/login`,{...loginInfo})
        .then(res => {
          if(res.data.message=="login successfully"){
            sessionStorage.setItem('login',"success");
            sessionStorage.setItem('adminName',res.data.adminName);
            sessionStorage.setItem('token', res.data.token);
            window.location.reload();
            setLoading(false);
          }
          else{
            setMessage(res.data.message);
            setLoading(false);
          }
          return res;
        })
        .catch(err => {
          console.error(err)
          setLoading(false);
        });
    }    
  }

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <input type="text" id="username" placeholder='Enter your username' required/>
        <input type="password" id="pwd" placeholder='Password' required/>
        <button type='submit' disabled={loading}>{loading?<span>Loading</span>:<span>Login</span>}</button>
      </form>
      {message && <h2 style={{color:'red'}}>{message}</h2>}
    </div>
  )
}
