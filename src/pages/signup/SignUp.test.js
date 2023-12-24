import React from 'react';
import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {SignUp} from './SignUp';
// import {AuthForm} from '../../component/forms/authform/AuthForm';
import {MemoryRouter} from 'react-router-dom';

// jest.mock('../../layout/Navbar',() => ({
//     Navbar: jest.fn(() => <div data-testid="navbarContainer">Navbar</div>),
// }));
jest.mock('firebase/auth',() => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn()

}));
const mockNavigate = jest.fn();

jest.mock('react-router-dom',() => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('../../component/forms/authform/AuthForm',() => ({
    AuthForm: jest.fn(() => <div data-testid="authForm">AuthForm</div>),
}));

jest.mock('../../assets/book-signup.jpg',() => 'book-signup-image-path.jpg');

describe('SignUp',() => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing',() => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <SignUp />
            </MemoryRouter>
        );
        expect(screen.getByTestId('navbarContainer')).toBeInTheDocument();
        expect(screen.findByTestId('authForm'));
    });

    it('should display the correct image for authentication',() => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <SignUp />
            </MemoryRouter>
        );
        const imageElement = screen.getByAltText('authentication');
        expect(imageElement.src).toContain('book-signup-image-path.jpg');
    });

    it('should pass dark text theme prop to Navbar component correctly',() => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <SignUp />
            </MemoryRouter>
        );
        expect(screen.getByTestId('navbarContainer')).toBeInTheDocument();
    });

    it('should render the signup header and paragraph text',() => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <SignUp />
            </MemoryRouter>
        );
        expect(screen.getByText('Signup')).toBeInTheDocument();
        expect(
            screen.getByText('Create a new account with email and password.')
        ).toBeInTheDocument();
    });

    it('should render the AuthForm with the button name "Sign Up"',() => {
        render(
            <MemoryRouter initialEntries={['/sign-up']}>
                <SignUp />
            </MemoryRouter>
        );
        expect(screen.findByTestId('authForm'));
    });

});
