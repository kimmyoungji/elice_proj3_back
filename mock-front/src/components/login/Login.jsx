import axios from "axios";
import React from "react";
import "./login.css";
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [ loginUser, setLoginUser ] = useState(null);
  const [ registerUser, setRegisterUser ] = useState(null);


  const handleLoginSubmit = async (e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:5001/api/auth/local/login',{email,password},{ headers:{withCredentials:true}});
    setLoginUser(res.config.data);
  }

  const handleRegisterSubmit = async (e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:5001/api/auth/local/signup',{email,password,username},{ headers:{withCredentials:true}})
    .then((res)=>{console.log(res); return res;});
    setRegisterUser(res.config.data);
  }

  const github = () => {
    window
      .open(
        "https://github.com/login/oauth/authorize" +
          `?client_id=${process.env.REACT_APP_GITHUB_CLIEND_ID}`,
        "_self"
      )
  };

  // const google = async () => {
  //   window.location.href = 'http://localhost:5001/api/auth/google/login';
  // }
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
        <br/>
        <br/>
        <form style={{width:'100%'}}>
            <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{width: "100%"}} autoComplete="current-email"/>
            <br/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} style={{width: "100%"}} autoComplete="current-password"/>
            <br/>
            <button type="submit" onClick={handleLoginSubmit} style={{width: "100%"}}>Login</button>
          </form>
          <br/>
          <br/>
          <form style={{width:'100%'}}>
            <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{width: "100%"}} autoComplete="current-email" />
            <br/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} style={{width: "100%"}} autoComplete="current-password"/>
            <br/>
            <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} style={{width: "100%"}} autoComplete="current-username"/>
            <br/>
            <button type="submit" onClick={handleRegisterSubmit} style={{width: "100%"}}>Register</button>
          </form>
          <div style={{color:"white", width:'100%'}}>{loginUser}</div>
          <br />
          <div style={{color:"white"}}>{registerUser}</div>
      </div>
    </div>
  );
}
