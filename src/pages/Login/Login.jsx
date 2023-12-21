import React from 'react'
import '../signup/SignUp.css'
import Authimg from '../../assets/book-signup.jpg'
import {Navbar} from '../../layout/Navbar'
import {AuthForm} from '../../component/forms/authform/AuthForm'
export const Login = () => {
    return (
        <>
            <Navbar darkTextTheme={true} />
            <section className='signup-container'>
                <div className="signup-img-container">
                    <img src={Authimg} alt="authentication" />
                </div>
                <div className="signup-content-container">
                    <div className="container">
                        <div className="content-wrapper">
                            <h2>Login</h2>
                            <p> Sign in with email and password.</p>
                            <AuthForm buttonName={"Login"} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
