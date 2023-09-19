import React, { useContext, useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const SignUp = () => {
    const { createUser, userEmailVerification } = useContext(AuthContext)
    const [messageError, setMessageError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const handleRegisterSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        setMessageError('')
        setSuccess('')
        console.log(`
        Email: ${email}
        Password: ${password}
        Confirm Password: ${confirm}
        `)
        if (password !== confirm) {
            setMessageError('Your Password did not Match');
            return;
        }
        else if (password.length < 6) {
            setMessageError('Password Must be 6 Characters or Longer')
            return;
        }
        createUser(email, password)
            .then(result => {
                const createdUser = result.user;
                console.log(createdUser)
                setSuccess('Your Account Has Been Created')
                form.reset()
                navigate('/')
                userEmailVerification(result.user)
                    .then(result => {
                        alert('Please Check Your Mail Box and Varification Your account')
                    })
            })
            .catch(error => {
                console.log('error', error.message)
                setMessageError(error.message)
            })
    }
    return (
        <div className='form-container1'>
            <h2 className='form-title1'>Sign Up</h2>
            <form onSubmit={handleRegisterSubmit}>
                <div className="form-control1">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='Email' required />
                </div>
                <div className="form-control1">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='Password' required />
                </div>
                <div className="form-control1">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="confirm" placeholder='Confirm Password' required />
                </div>
                <p><span className='error'>{messageError}</span><span className='success'>{success}</span></p>
                <input className='btn-submit1' type="submit" value="Sign Up" />
                <p className='register-to-login-text-and-btn'>
                    Already have an account? <Link to="/login" className='register-to-login-btn'>Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;