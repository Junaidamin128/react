import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';




function Register({loadUser}) {
  const [error,setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");



  const onSubmit = async (evt) =>{
    evt.preventDefault();
    if(password !== confirmPassword){
      setPasswordError("Password not matched") 
      return;
    }
    try{
      let res = await axios.post("http://localhost:3345/user/register",{
        username : username,
        email: email,
        password: password
      });
      if(res.data?.token){
        localStorage.setItem('token',res.data.token)
        loadUser();
      }
    }catch(err){
      if(err.response?.data){
        let data = err.response.data;
        setError("");
        if(data.name && data.name === "form"){
          setError(data.msg)
        }
      }
    }

  }



  return <>
      <form onSubmit={onSubmit}>
        <div className="row mb-3">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              required
              type="text"
              className="form-control"
              name="username"
              id="username"
              value={username}
              onChange={(evt)=>{
                setUsername(evt.target.value)
              }}
              // onInput={() => {
              //   setUsernameError("");
              // }}
            />
            {/* {Username} */}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              required
              type="text"
              className="form-control"
              name="email"
              id="inputEmail3"
              value={email}
              onChange={(evt)=>{
                setEmail(evt.target.value);
              }}
              // onInput={() => {
              //   setEmailError("");
              // }}
            />
            {error}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              required
              name="password"
              type="password"
              className="form-control"
              id="inputPassword3"
              value={password}
              onChange={(evt)=>{
                setPassword(evt.target.value);
              }}
            />
            {passwordError}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Confirm Password
          </label>
          <div className="col-sm-10">
            <input
              required
              name="password"
              type="password"
              className="form-control"
              id="inputconfirmPassword"
              value={confirmPassword}
              onChange={(evt)=>{
                setConfirmPassword(evt.target.value);
              }}
            />
            {/* {passwordError} */}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      <NavLink className="btn btn-success" type="submit" to="/login" >Already have an Account</NavLink>
      </form>
  </>
}

export default Register
