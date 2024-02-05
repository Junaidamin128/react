import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/style.css";
import axios from 'axios';

const Signin = () => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: [e.target.value] })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const result = axios.post("http://localhost:3345/user/login",{
                "username": formData['username'],
                "password": formData['password']
            })
            console.log(result);
        } catch (err) {
            if(err.response.data.name && err.response.data.name === "err msg"){
                setError(err.response.data.msg );
              }
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center my-5">
                <div className="glassmorphism-container p-4 rounded">
                    <form className="mb-3" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={handleChange} id="username" required />
                            <label htmlFor="username" className="form-label">Username</label>
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" onChange={handleChange} id="password" required />
                            <label htmlFor="password" className="form-label">Password</label>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                            <Link to="/forgot-password" className="link-secondary">Forgot Password?</Link>
                        </div>

                        <p className="mt-3 text-center">
                            Don't have an account? <Link to="/register" className="link-primary">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin
