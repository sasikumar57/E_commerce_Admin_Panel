import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Header = () => {

    const name = sessionStorage.getItem('name')
    const navigate = useNavigate()

    const OnLogout = () => {
        sessionStorage.clear()
        Swal.fire({
            title: 'Logged out',
            text: 'Logged out Successfully',
            icon: 'success'
        })
        navigate('/login')

    }

    return (
        <>
            <header>
                <div className='first-section'>
                <a href='/'><div className='logo-section'>
                        <img src='../ajio2.png' title='Home' alt='Ajio logo' />
                    </div></a>
                    <div className='title-section'>
                        <p>Ajio Shopping Site</p>
                    </div>
                </div>
                <div className='second-section'>
                    <div className='admin-actions'>
                        {name ?
                        <>
                        <ul>
                            <li><a href="/" title='Logout' onClick={OnLogout}><button className='header-logout-btn header-btns'>Logout</button></a></li>
                        </ul>
                        </> :
                        <ul>
                            <li><a href="/login" title='Login'><button className='header-login-btn header-btns'>Login</button></a></li>
                            <li><a href='/registration' title='Register'><button className='header-register-btn header-btns'>Register</button></a></li>
                        </ul>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header