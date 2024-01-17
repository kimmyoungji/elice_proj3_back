import axios from "axios";
import React from "react";
import "./login.css";
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:5001/api/auth/local/login',{email,password},{withCredentials:true});
    console.log(res);
  }

  const github = () => {
    window
      .open(
        "https://github.com/login/oauth/authorize" +
          `?client_id=${process.env.REACT_APP_GITHUB_CLIEND_ID}`,
        "_self"
      )
  };

  const google = async () => {
    window.location.href = 'http://localhost:5001/api/auth/google/login';
  }
  const kakao = () => {}

  return (
    <div>
      <div className="loginContainer">
        <div className="inputGroup">
          <button className="loginButton" onClick={github}>
            <img src="../assets/git.jpg" alt="" className="buttonImg" />
          </button>
          <button className="loginButton" onClick={()=>{
            window.location.href = 'http://localhost:5001/api/auth/google/login';
          }}>
            <img src="../assets/google.png" alt="" className="buttonImg" />
          </button>
          <button className="loginButton" onClick={kakao}>
            <img src="../assets/kakao.png" alt="" className="buttonImg" />
          </button>
        </div>
         <form style={{width:'100%'}}>
            <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{width: "100%"}}/>
            <br/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} style={{width: "100%"}}/>
            <br/>
            <button type="submit" onSubmit={handleSubmit} style={{width: "100%"}}>Login</button>
          </form>
      </div>
    </div>
  );
}
