import {signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth'
import React,{useEffect,useState} from 'react'
import {auth,provider} from '../firebase/firebase'
import '../css/common.css'
import './Login.css'
import google from '../assets/google-icon.png';
export const Login = () => {
    const [userDetails,setUserDetails] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const LoginWithPopup = () => {
        signInWithPopup(auth,provider).then((resp) => {
            console.log(resp);
            const userName = auth.currentUser.displayName;
            const email = auth.currentUser.email;
            const photoUrl = auth.currentUser.photoURL;
            console.log(photoUrl);
            console.log("Name ",userName," email ",email);
            console.log(userDetails);
            localStorage.setItem("ecommerce-user",JSON.stringify({userName,email,photoUrl}));
            setUserDetails({userName,email,photoUrl});
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        console.log("email ",email,"  password  ",password);
    },[email,password])


    const LoginWithEmailPassword = async () => {
        await signInWithEmailAndPassword(auth,email,password,true).then((resp) => {
            console.log(resp);
            const userName = auth.currentUser.displayName;
            const email = auth.currentUser.email;
            const photoUrl = auth.currentUser.photoURL;
            console.log(photoUrl);
            console.log("Name ",userName," email ",email);
            console.log(userDetails);
            localStorage.setItem("ecommerce-user",JSON.stringify({userName,email,photoUrl}));
            setUserDetails({userName,email,photoUrl});
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>

            <div className='login-container '>
                <input
                    type="email"
                    placeholder='Email'
                    className='input-field'
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <input
                    type="password"
                    placeholder='Password'
                    className='input-field'
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button
                    className=' btn btn-dark'
                    onClick={LoginWithEmailPassword}
                >Login</button>
                or
                <button
                    className=' btn flex'
                    onClick={LoginWithPopup}
                >
                    <img src={google} alt="icon" width={30} height={30} />  continue with google
                </button>
            </div>
            {userDetails && <div>
                <img src={`${userDetails.photoUrl}`} alt="icon" />
                <h1>{userDetails.userName}</h1>
                <h3>{userDetails.email}</h3>
            </div>}
        </>
    )
}
