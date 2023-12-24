
import React from 'react';
import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Login} from './Login';
import {Navbar} from '../../layout/Navbar';
import {AuthForm} from '../../component/forms/authform/AuthForm';
import * as ReactRouter from 'react-router';

jest.mock('../../layout/Navbar',() => ({
    Navbar: jest.fn(() => null),
}));

jest.mock('../../component/forms/authform/AuthForm',() => ({
    AuthForm: jest.fn(() => null),
}));

jest.mock('react-router',() => ({
    ...jest.requireActual('react-router'),
    useNavigate: jest.fn(),
}));

describe('<Login />',() => {
    beforeEach(() => {

        Navbar.mockClear();
        AuthForm.mockClear();
        ReactRouter.useNavigate.mockClear();
    });

    test('renders without crashing',() => {
        render(<Login />);
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Sign in with email and password.')).toBeInTheDocument();
    });

    test('renders Navbar with dark text theme',() => {
        render(<Login />);
        expect(Navbar).toHaveBeenCalledWith({darkTextTheme: true},{});
    });

    test('renders authentication image',() => {
        render(<Login />);
        const authImg = screen.getByAltText('authentication');
        expect(authImg).toBeInTheDocument();
        expect(authImg).toHaveAttribute('src');
    });

    test('renders AuthForm with correct button name',() => {
        render(<Login />);
        expect(AuthForm).toHaveBeenCalledWith({buttonName: 'Login'},{});
    });

    test('displays correct heading and paragraph',() => {
        render(<Login />);
        expect(screen.getByRole('heading',{level: 2})).toHaveTextContent('Login');
        expect(screen.getByText('Sign in with email and password.')).toBeInTheDocument();
    });

    // Test for additional edge cases as per the application specifications
    // For instance, if there were any conditional rendering, state changes, or side effects, 
    // those scenarios would be tested here as well.
});
