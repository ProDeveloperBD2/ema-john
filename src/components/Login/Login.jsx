import React, { useContext, useRef, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const Login = () => {
    const emailRef = useRef()
    const [show, setShow] = useState(false)
    const location = useLocation();
    console.log(location)
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();
    const { loginUser, forgetPassword } = useContext(AuthContext)
    const handleLoginSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(`
        Email: ${email}
        Password: ${password}
        `)
        loginUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset()
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please Enter Your Email');
            return;
        }
        forgetPassword(email)
            .then(result => {
                alert('Please Check Your Email')
            })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" name="email" id="email" placeholder='Email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name="password" id="password" placeholder='Password' required />
                    <div className='show-hide-and-forget-password'>
                        <p className="show-hide-btn" onClick={() => setShow(!show)}>{show ? 'Hide Password' : 'Show Password'}</p>
                        <Link onClick={handleResetPassword}>Forget Password</Link>
                    </div>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
                <p className='login-to-register-text-and-btn'>
                    New to Ema-John? <Link to="/signup" className='login-to-register-btn'>Create New Account</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;