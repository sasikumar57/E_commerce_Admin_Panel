import React, { useReducer, useState } from 'react'
import Header from '../assets/DesignComponent/Header'
// import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ApiCall from '../assets/DesignComponent/ApiCall'

const initialState = {
    Name: '',
    Email: '',
    Password: '',
    Re_enterPassword: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'Name':
            return { ...state, Name: action.value }
        case 'Email':
            return { ...state, Email: action.value }
        case 'Password':
            return { ...state, Password: action.value }
        case 'Re_enterPassword':
            return { ...state, Re_enterPassword: action.value }
        default:
            return state
    }
}

const Registration = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [showPassword, setShowPassword] = useState(false);
    const [reshowPassword, setreShowPassword] = useState(false);
    const { Name, Email, Password, Re_enterPassword } = state
    // const api_url = 'http://localhost:3000/UserDetails'
    const navigate = useNavigate()
    const { data, triggerAPI } = ApiCall()

    const UpdateValues = (e) => {
        dispatch({ type: e.target.name, value: e.target.value })
    }

    const RegisterUser = async () => {

        if (Name === '' || Email === '' || Password === '' || Re_enterPassword === '') {
            Swal.fire({
                title: 'Fill out all the fields',
                text: 'All the fields are mandatory',
                icon: 'error'
            });
            return; // Stop execution if fields are empty
        }

        
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(Email)) {
            Swal.fire({
                title: 'Invalid Email',
                text: 'Please enter a valid Email Id',
                icon: 'error'
            });
            return; 
        }

        if (Password !== Re_enterPassword) {
            Swal.fire({
                title: 'Password Mismatch',
                text: 'Passwords does not match',
                icon: 'error'
            });
            return; // Stop execution if passwords don't match
        }

        try {
            await triggerAPI('/UserDetails', 'post', state);
            Swal.fire({
                title: 'Congrats!',
                text: 'Registration Successful',
                icon: 'success'
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Oops!',
                text: 'Registration Failed',
                icon: 'error'
            });
        }
    }

    const ClearFields = () => {
        dispatch({ type: 'Name', value: '' });
        dispatch({ type: 'Email', value: '' });
        dispatch({ type: 'Password', value: '' });
        dispatch({ type: 'Re_enterPassword', value: '' });
        
        document.querySelectorAll('.registration-input-box').forEach(input => input.value = '');
    };
    
    return (
        <>
            <Header />
            <div className="registration-container">
                <div className="registration-card">
                    <h2 className="registration-header">Registration</h2>
                    <input name='Name' onChange={UpdateValues} type="text" placeholder="Enter name" className="registration-input-box" />
                    <input name='Email' onChange={UpdateValues} type="email" placeholder="Enter email" className="registration-input-box" />
                    <input name='Password' onChange={UpdateValues} type={showPassword ? 'text' : 'password'} placeholder="Enter password" className="registration-input-box" /><i
                        className={showPassword ? 'fas fa-eye-slash password-toggle-icon' : 'fas fa-eye password-toggle-icon'}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                    <input name='Re_enterPassword' onChange={UpdateValues} type={reshowPassword ? 'text' : 'password'} placeholder="Re-enter password" className="registration-input-box" />
                    <i
                        className={reshowPassword ? 'fas fa-eye-slash repassword-toggle-icon' : 'fas fa-eye repassword-toggle-icon'}
                        onClick={() => setreShowPassword(!reshowPassword)}
                    ></i>
                    <div className="registration-button-group">
                        <button className="registration-register-button" onClick={RegisterUser}>Register</button>
                        <button className="registration-cancel-button" onClick={ClearFields}>Clear</button>
                    </div>
                    <p className="login-register-text">
                        Already Registered? <a href='/login'><span className="login-register-link">Login Here</span></a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Registration