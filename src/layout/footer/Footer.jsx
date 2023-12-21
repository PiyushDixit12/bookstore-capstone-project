import React,{useRef} from 'react'
import './Footer.css'
import emailjs from '@emailjs/browser'

const serviceId = "service_hudclxo";
const templetId = "template_sg212jv";
const publicKey = "hmcfOZhjGCeHLqW1m";
export const Footer = () => {
    const formRef = useRef(null);
    console.log(formRef);
    async function handleSubmit(e) {

        e.preventDefault();
        console.log("email is sending ");
        await emailjs.sendForm(serviceId,templetId,formRef.current,publicKey).then((resp) => {
            console.log(resp);
            console.log("===================sended succeffuly ====================");
        }).catch(err => console.log(err));
        e.target.reset();
    }

    return (
        <section className='footer-container'>
            <div className="container">
                <h2>If you have any query feel free to ask here</h2>

                <form ref={formRef} onSubmit={handleSubmit} className='footer-form'>
                    <div className="form-group">
                        <label htmlFor="name" className='form-label'>Name :</label>
                        <input type="text"
                            name='user_name'
                            id='name'
                            placeholder="Enter your name" className='form-input' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className='form-label'>Email :</label>
                        <input type="email"
                            id='email'
                            name='user_email'
                            placeholder="Enter your email"
                            className='form-input' />
                    </div> <div className="form-group">
                        <label htmlFor="query" className='form-label'>Query : </label>
                        <textarea className='form-input' name='message'
                            placeholder="Type your Query" ></textarea>
                    </div>
                    <div className="form-group">
                        <input type='submit' value="Submit"
                            className="form-submit" />
                    </div>
                </form>

                <p>&copy; 2023 bookstore. All Rights Reserved</p>
            </div>
        </section>
    )
}
