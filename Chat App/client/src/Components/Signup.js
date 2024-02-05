import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { userContext } from '../Context/userContext';


const Signup = () => {
    const { loadUser } = useContext(userContext);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null)
            }, 2000);
        }
    }, [error])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData['password'] !== formData['confirmPassword']) {
            setError("Password should match")
        }
        try{
            let res = await axios.post("http://localhost:3345/user/register", {
                "firstname": formData['firstName'],
                "lastname": formData['lastname'],
                "username": formData['username'],
                "password": formData['password'],
                "email": formData['email']
              });
              if (res.data?.token) {
                localStorage.setItem('token', res.data.token)
                loadUser();
              }

        }catch(err){
            if(err.response.data.name && err.response.data.name == "err msg"){
                setError(err.response.data.msg );
              }
        }

    };
    return (
        <>
            <div className="d-flex justify-content-center align-items-center my-5">
                <div className="glassmorphism-container p-4 rounded">
                    <form className="mb-3" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-between">
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={handleChange} id="firstName" required />
                                <label htmlFor="firstName" className="form-label">First Name</label>
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" onChange={handleChange} id="lastName" required />
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" onChange={handleChange} id="username" required />
                            <label htmlFor="username" className="form-label">Username</label>
                        </div>

                        <div className="form-group">
                            <input type="email" className="form-control" onChange={handleChange} id="email" required />
                            <label htmlFor="email" className="form-label">Email</label>
                        </div>

                        <div className="d-flex justify-content-between">
                            <fieldset className="form-group">
                                <input type="password" className="form-control" onChange={handleChange} id="password" required />
                                <label htmlFor="password" className="form-label">Password</label>
                            </fieldset>

                            <div className="form-group">
                                <input type="password" className="form-control" onChange={handleChange} id="confirmPassword" required />
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            </div>
                        </div>

                        {error && <div className='alert alert-danger'>{error}</div>}

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                            <Link to="/login" className="link-secondary">Already have an account?</Link>
                        </div>

                        <p className="mt-3 text-center">
                            By signing up, you agree to our <Link to="/terms" className="link-primary">Terms</Link>.
                        </p>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Signup
