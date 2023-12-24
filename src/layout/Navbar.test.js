
import React from 'react';
import {render,fireEvent,screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Navbar} from './Navbar';
import {userContext} from '../App';
import {auth} from '../firebase/firebase';
import * as firebaseAuth from 'firebase/auth';

jest.mock('firebase/auth',() => {
    return {
        signOut: jest.fn(),
        getAuth: jest.fn(),
        GoogleAuthProvider: jest.fn()
    };
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom',() => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const userProviderValue = {
    user: {
        accessToken: 'mockAccessToken',
    },
    setUser: jest.fn(),
};

const setup = (darkTheme = false,darkTextTheme = false) => {
    return render(
        <Router>
            <userContext.Provider value={userProviderValue}>
                <Navbar darkTheme={darkTheme} darkTextTheme={darkTextTheme} />
            </userContext.Provider>
        </Router>
    );
};

describe('Navbar',() => {


    it('should toggle the navbar when mobile menu icon is clicked',() => {
        setup();
        const mobileMenuIcon = screen.getByRole('button'); // Assuming the first button is the toggle button
        fireEvent.click(mobileMenuIcon);
        expect(screen.getByRole('navigation')).toHaveClass('active');
        fireEvent.click(mobileMenuIcon);
        expect(screen.getByRole('navigation')).not.toHaveClass('active');
    });



    it('should display login and signup links when user is null',() => {
        userProviderValue.user = null;
        setup();
        expect(screen.queryByText(/login/i)).toBeInTheDocument();
        expect(screen.queryByText(/sign up/i)).toBeInTheDocument();
    });

    it('should apply dark theme classes when darkTheme prop is true',() => {
        setup(true);
        console.log("navigation ==========================",screen.findByRole("navigation"))
        const navbarContainer = screen.getByTestId("navbarContainer");
        expect(navbarContainer).toHaveClass('background-dark');
        expect(navbarContainer).toHaveClass('position-relative');
    });

    it('should apply dark text theme classes when darkTextTheme prop is true',() => {
        setup(false,true);
        const navLinks = screen.getAllByText(/home/i)[0];
        expect(navLinks).toHaveClass('nav-links-dark');
    });
});
