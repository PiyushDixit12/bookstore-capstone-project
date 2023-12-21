import React from 'react'
import './SignUp.css'
import Authimg from '../../assets/book-signup.jpg'
import {Navbar} from '../../layout/Navbar'
import {AuthForm} from '../../component/forms/authform/AuthForm'
export const SignUp = () => {
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
                            <h2>Signup</h2>
                            <p>Create a new account with email and password.</p>
                            <AuthForm buttonName={"Sign Up"} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
