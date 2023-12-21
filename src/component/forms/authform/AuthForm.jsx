import React,{useState} from 'react'
import {auth} from '../../../firebase/firebase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {path} from '../../../routes/RouteConstant';
import {ErrorMessage,Formik} from 'formik';
import * as yup from 'yup';
import {toast} from 'react-toastify';

const authValidation = yup.object().shape({
    userName: yup.string().min(2).max(25),
    userEmail: yup.string().email("Invalid Email ").required("Email Required"),
    userPassword: yup.string().min(6).max(20).required("Password Required"),
});


export const AuthForm = ({buttonName}) => {
    // const [email,setEmail] = useState("");
    // const [name,setName] = useState("");
    // const [password,setPassword] = useState("");
    const navigate = useNavigate();
    async function hadleAuth(name,email,password,resetForm) {
        // e.preventDefault();
        console.log("email",email,"name",name,"password",password)
        if(buttonName === 'Login') {
            console.log("login called");

            signInWithEmailAndPassword(auth,email,password).then((userCredantial) => {
                console.log(userCredantial);
                navigate(path.Home.path);

                toast.success("🎉🎉 Login successfully 🎉🎉",{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }).catch((err) => {
                toast.error(err?.code?.split("/")[1],{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            });

        } else {
            createUserWithEmailAndPassword(auth,email,password).then((userCredantial) => {
                userCredantial.user.displayName = name;
                console.log(userCredantial.user);
                navigate(path.Home.path);
                toast.success("🎉🎉 Account Successfully Created 🎉🎉",{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }).catch((err) => {
                console.log(err);
                toast.error(err?.code?.split("/")[1],{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
            console.log("submited");
            console.log("username :")
        }

        resetForm();
    }
    return (
        <>
            <Formik
                validationSchema={authValidation}
                initialValues={{
                    userName: "",
                    userEmail: "",
                    userPassword: "",
                }}
                onSubmit={async (values,{resetForm}) => {
                    await hadleAuth(values.userName,values.userEmail,values.userPassword,resetForm);
                    console.log("values are : ",values,"otherData : ");

                }}
            >
                {({handleChange,handleBlur,handleSubmit,values,isSubmitting,isValidating}) => {

                    return <form onSubmit={handleSubmit}>
                        {buttonName == 'Sign Up' && <div className="form-group">
                            <label htmlFor="name-signup" className='auth-label'>Name</label>
                            <input type="text"
                                id='name-singup'
                                name='userName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // onChange={(e) => setName(e.target.value)}
                                value={values.userName}
                                placeholder="Enter your name"
                                className='form-input' />
                            <ErrorMessage component={"div"} className='input-error' name={"userName"} />
                        </div>}
                        <div className="form-group">
                            <label htmlFor="email-singup" className='auth-label'>Email</label>
                            <input type="text"
                                id='email-singup'
                                name='userEmail'
                                // onChange={(e) => setEmail(e.target.value)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // value={email}
                                value={values.userEmail}
                                placeholder="Enter your email" className='form-input' />
                            <ErrorMessage component={"div"} className='input-error' name={"userEmail"} />

                        </div>
                        <div className="form-group">
                            <label htmlFor="password-singup" className='auth-label'>Password</label>
                            <input type="text"
                                id='password-singup'
                                name='userPassword'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // onChange={(e) => setPassword(e.target.value)}
                                value={values.userPassword}
                                placeholder="Enter your password" className='form-input' />
                            <ErrorMessage component={"div"} className='input-error' name={"userPassword"} />

                        </div>
                        <div className="form-group">
                            <input type="submit"
                                value={(isSubmitting || isValidating ? "data submiting" : "") + buttonName}

                                className='button-primary' />
                        </div>
                    </form>

                }}
            </Formik>
        </>
    )
}
