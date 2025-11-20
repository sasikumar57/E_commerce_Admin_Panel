import React, { useEffect, useState } from 'react'
import Header from '../assets/DesignComponent/Header'
// import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ApiCall from '../assets/DesignComponent/ApiCall'

const Login = () => {

    const [RegistrationData, setRegistrationData] = useState([])
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { data, triggerAPI } = ApiCall()
    const [showPassword, setShowPassword] = useState(false);

    const getUserInfo = async () => {
        // const response = await axios.get('http://localhost:3000/UserDetails')
        await triggerAPI('/UserDetails', 'get')
        setRegistrationData(data)
    }

    const UserLogin = () => {
        if (username === '' || password === '') {
            Swal.fire({
                title: 'Oops',
                text: 'Please enter both fields',
                icon: 'error'
            })
        } else {
            // Use 'find' instead of 'forEach' to stop at the first match
            const user = RegistrationData.find((data) => data.Email === username && data.Password === password);

            if (user) {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                sessionStorage.setItem('name', user.Name);

                Swal.fire({
                    title: `Congrats ${user.Name}`, 
                    text: 'Login Successful',
                    icon: 'success'
                });
                navigate('/'); 
            } else {
                Swal.fire({
                    title: 'Oops',
                    text: 'Email or Password is incorrect! Enter Registered Credentials.',
                    icon: 'error'
                });
            }
        }
    }


    useEffect(() => {
        getUserInfo()
    }, [data])

    const ClearFields = () => {
        setUserName(''); 
        setPassword(''); 
        
        document.querySelectorAll('.login-input-box').forEach(input => input.value = '');
    };
    

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-header">Login here!!</h2>
                    <input type="text" placeholder="Enter Email" onChange={((e) => { setUserName(e.target.value) })} className="login-input-box" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" onChange={((e) => { setPassword(e.target.value) })} className="login-input-box" />
                    <i
                        className={showPassword ? 'fas fa-eye-slash password-toggle-icon' : 'fas fa-eye password-toggle-icon'}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                    <div className="login-button-group">
                        <button className="login-login-button" onClick={UserLogin}>Login</button>
                        <button className="login-cancel-button" onClick={ClearFields}>Clear</button>
                    </div>
                    <p className="login-register-text">
                        New User? <a href='/registration'><span className="login-register-link">Register Here</span></a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
