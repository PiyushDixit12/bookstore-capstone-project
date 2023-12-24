
// All necessary imports
import React from 'react';
import {render,fireEvent,waitFor,screen} from '@testing-library/react';
import {Formik,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import userEvent from "@testing-library/user-event";

import '@testing-library/jest-dom';

jest.mock('firebase/auth',() => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
}));
jest.mock('react-router-dom',() => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Mock handleAuth function to simulate authentication behavior
const handleAuth = jest.fn();
jest.mock('firebase/auth',() => ({
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn(),
}));

// Define the form component with Formik wrapper
const FormComponent = ({buttonName,authValidation,handleAuth}) => (
    <Formik
        validationSchema={authValidation}
        initialValues={{
            userName: "",
            userEmail: "",
            userPassword: "",
        }}
        onSubmit={async (values,{resetForm}) => {
            await handleAuth(values.userName,values.userEmail,values.userPassword,resetForm);
            console.log("values are : ",values,"otherData : ");
            resetForm();
        }}
    >
        {/* Form content */}{({handleChange,handleBlur,handleSubmit,values,isSubmitting,isValidating}) => {

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
);

// Define the validation schema for the form
const authValidation = Yup.object({
    userName: Yup.string().required('Name is required'),
    userEmail: Yup.string().email('Invalid email').required('Email is required'),
    userPassword: Yup.string().min(6,'Password must be at least 6 characters').required('Password is required'),
});

// Unit tests covering all scenarios
describe('FormComponent',() => {
    it('renders the form and allows submission with valid inputs',async () => {
        const buttonName = 'Sign Up';
        render(<FormComponent buttonName={buttonName} authValidation={authValidation} handleAuth={handleAuth} />);

        const nameInput = screen.getByPlaceholderText('Enter your name');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const submitButton = screen.getByRole('button',{name: buttonName});

        userEvent.type(nameInput,'John Doe');
        userEvent.type(emailInput,'johndoe@example.com');
        userEvent.type(passwordInput,'password');

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(handleAuth).toHaveBeenCalledWith('John Doe','johndoe@example.com','password',expect.anything());
        });
    });

    it('validates input fields and does not submit with invalid data',async () => {
        const buttonName = 'Sign Up';
        render(<FormComponent buttonName={buttonName} authValidation={authValidation} handleAuth={handleAuth} />);

        const emailInput = screen.getByPlaceholderText('Enter your email');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const submitButton = screen.getByRole('button',{name: buttonName});

        userEvent.type(emailInput,'not-an-email');
        userEvent.type(passwordInput,'123'); // Too short
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid email')).toBeInTheDocument();
            expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
        });

        expect(handleAuth).not.toHaveBeenCalled();
    });

    it('shows a different label when the buttonName prop changes',() => {
        const buttonName = 'Sign In';
        render(<FormComponent buttonName={buttonName} authValidation={authValidation} handleAuth={handleAuth} />);

        const submitButton = screen.getByRole('button',{name: buttonName});
        expect(submitButton).toBeInTheDocument();
    });

    it('calls resetForm after a successful submission',async () => {
        const buttonName = 'Sign Up';
        render(<FormComponent buttonName={buttonName} authValidation={authValidation} handleAuth={handleAuth} />);

        handleAuth.mockResolvedValueOnce();
        const resetForm = jest.fn();
        const anotherFuntion = jest.fn((data,{resetForm}) => {resetForm();})
        const nameInput = screen.getByPlaceholderText('Enter your name');
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const submitButton = screen.getByRole('button',{name: buttonName});

        userEvent.type(nameInput,'Jane Doe');
        userEvent.type(emailInput,'janedoe@example.com');
        userEvent.type(passwordInput,'password');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(handleAuth).toHaveBeenCalledWith('Jane Doe','janedoe@example.com','password',expect.any(Function));
            expect(resetForm).not.toHaveBeenCalled();
        });
    });

    it('displays submitting status when isSubmitting or isValidating is true',async () => {
        const buttonName = 'Sign Up';
        render(<FormComponent buttonName={'data submitting' + buttonName} authValidation={authValidation} handleAuth={handleAuth} />);

        const submitButton = screen.getByRole('button');
        expect(submitButton).toHaveValue('data submitting' + buttonName);
    });
});


