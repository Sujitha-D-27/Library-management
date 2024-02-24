/*import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';
export default function Signin() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
      });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState('');
    const handleInput = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }
    const handlesubmit = async (event) => {
        event.preventDefault();
            try {
                const response = await axios.post('http://localhost:6060/loginn', credentials);
                const role = response.data.role;
                console.log(role);
                if (role === 'admin') {
                  // Redirect to admin page
                  navigate('/books');
      
                  console.log('Redirecting to Admin Page');
                } else if (role === 'user') {
                  // Redirect to home page
                  navigate('/users');
                  console.log('Redirecting to Home Page');
                }
              } catch (error) {
                console.error('Error during login:', error);
                // Handle login error (e.g., display error message)
                setErrorMessage('Invalid credentials. Please try again.');
              }
        
    }
    return (
        <div className="container">
            <h2>Sign-In</h2>
            <form className="register-form" onSubmit={handlesubmit}>
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" placeholder="Enter Email" name="email" onChange={handleInput} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" name="password" onChange={handleInput} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit" className="login control">Sign In</button>

                <Link to="/Signup" className="login control">
                    <button className="login control">Create Account</button>
                </Link>
                {errorMessage && <p className="error">{errorMessage}</p>} 
      </form>
        </div>
    )
}*/
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';

export default function Signin() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear the specific error when the user changes the input
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const response = await axios.post('http://localhost:6060/loginn', credentials);

            const role = response.data.role;
            console.log(role);
            if (role === 'admin') {
                navigate('/books');
            } else if (role === 'user') {
                navigate('/users');
            }
        } catch (error) {
            console.error('Error during login:', error);

            if (error.response && error.response.status === 401) {
                // Unauthorized - invalid credentials
                setErrorMessage('Invalid credentials. Please try again.');
            } else {
                // Other errors (network issues, server errors, etc.)
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Sign-In</h2>
            <form className="register-form" >
                <div className="form-group">
                    <label>E-mail</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        name="email"
                        onChange={handleInput}
                        value={credentials.email}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleInput}
                        value={credentials.password}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit" className="login control" onClick={handleSubmit}>
                    Sign In
                </button>

                <Link to="/Signup" className="login control">
                    <button className="login control">Create Account</button>
                </Link>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </div>
    );
}

