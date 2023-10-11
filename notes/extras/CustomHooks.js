import React, { useState } from 'react'


function useCounter(init = 0) {
  const [count, setCount] = useState(init);

  const inc = () => {
    setCount(count + 1);
  }
  const dec = () => {
    setCount(count - 1);
  }

  return [count, inc, dec];
}

function useErrors(err = {}) {
  const [errors, setErrors] = useState(err);
  const setError = (name, value) => {
    let newError = {...errors};
    newError[name] = value;
    setErrors(newError);
  }
  return [errors, setError];
}

function Demo({v}){
  return <h1>
    {v} {Math.random()} hll
  </h1>
}

function Register() {
   const [errors, setError] = useErrors({name:"", email:"", password: ""});

  return <>
  <div>
    {errors.name}
    <button onClick={()=>setError('name', "Ollala")}>Click</button>
  </div>
  <div>
    {errors.email}
    <Demo v={errors.email} />
    <button onClick={()=>setError('email', "dsgdsfg")}>Click</button>
  </div>
  </>
}

export default Register
