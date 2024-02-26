import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpValidation from './SignUpValidation';
function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handlesubmit = async (event) => {
        event.preventDefault();
        setErrors(SignUpValidation(values));
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            try {
                const response = await axios.post('https://library-management-1-m3xj.onrender.com/signup', values);
                console.log(response.data); // Handle response data as needed
                navigate('/');
            }
            catch (error) {
                console.error('Error during signup:', error);
            }
        }
    }
    const navtosignin=()=>{
        navigate('/')
    }
    return (
        <div className="container">
            <h2>Sign-Up</h2>
            <form className="register-form" onSubmit={handlesubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" name="name" onChange={handleInput} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                < div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" placeholder="Enter Email" name="email" onChange={handleInput} />
                    {errors.email && <span className="error">{errors.email}</span>}

                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" name="password" onChange={handleInput} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit" className="login control">Sign Up</button>
               
                <button className="login control" onClick={navtosignin}>Sign In</button>
              
            

            </form>
        </div>
    )
}

export default Signup