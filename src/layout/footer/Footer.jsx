import React,{useRef} from 'react'
import './Footer.css'
import emailjs from '@emailjs/browser'
import {Field,Form,Formik} from 'formik';
import * as yup from 'yup';
import {toast} from 'react-toastify';
const serviceId = "service_hudclxo";
const templetId = "template_sg212jv";
const publicKey = "hmcfOZhjGCeHLqW1m";

const validationQuery = yup.object().shape({
    user_name: yup.string().min(2).max(100).required(),
    user_email: yup.string().email().required(),
    message: yup.string().min(5).max(1000).required()
});
export const Footer = () => {
    const formRef = useRef(null);
    console.log(formRef);
    async function handleEmailSubmit(e) {
    // e.preventDefault();
        console.log("email is sending ");
        await emailjs.sendForm(serviceId,templetId,formRef.current,publicKey).then((resp) => {
            console.log(resp);
            console.log("===================sended succeffuly ====================");
        }).catch(err => console.log(err));

    }

    return (
        <section data-testid="footer" className='footer-container'>
            <div className="container">
                <h2>If you have any query feel free to ask here</h2>
                <Formik
                    initialValues={{
                        user_name: "",
                        user_email: "",
                        message: ""
                    }}
                    validationSchema={validationQuery}
                    onSubmit={(values,{resetForm}) => {
                        handleEmailSubmit(values);
                        console.log(values);
                        toast.success("🎉🎉 Query submited successfully 🎉🎉",{
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        resetForm();
                    }}
                >
                    {({handleBlur,handleChange,handleSubmit}) => {
                        return <Form ref={formRef} onSubmit={handleSubmit} className='footer-form'>
                    <div className="form-group">
                        <label htmlFor="name" className='form-label'>Name :</label>
                                <Field
                                    type="text"
                                    name='user_name'
                                    id='name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className='form-input'
                                />
                    </div>
                            <div className="form-group">
                        <label htmlFor="email" className='form-label'>Email :</label>
                                <Field type="email"
                            id='email'
                            name='user_email'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                            placeholder="Enter your email"
                            className='form-input' />
                            </div>
                            <div className="form-group">
                        <label htmlFor="query" className='form-label'>Query : </label>
                                <Field className='form-input' name='message'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Type your Query" ></Field>
                    </div>
                    <div className="form-group">
                                <input type='submit' value="Submit" 
                                    className="form-submit" onSubmit={handleSubmit} />
                    </div>
                        </Form>
                    }
                    }
                </Formik>
                <p>&copy; 2023 bookstore. All Rights Reserved by Piyush Dixit</p>
            </div>
        </section>
    )
}
