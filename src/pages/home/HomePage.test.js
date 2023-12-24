
import React from 'react';
import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../../layout/Navbar'; // Assuming the relative path of the `Navbar` component
import Footer from '../../layout/footer/Footer'; // Assuming the relative path of the `Footer` component

// Assuming the above described React component is named `HomePage`, adjust the name based on actual component name
import {HomePage} from './HomePage'; // Assuming the relative path of the Showcase component
import {MemoryRouter,Router} from 'react-router-dom';

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
describe('Home Page ',() => {
    test('renders Navbar with darkTheme prop set to false',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);
        expect(screen.getByRole('navigation')).toBeInTheDocument();

        expect(screen.getByRole('navigation')).not.toHaveClass('dark-theme');
    });

    test('renders overlay',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);
        const overlayElement = screen.getByTestId('overlay');
        expect(overlayElement).toBeInTheDocument();
        expect(overlayElement).toHaveClass('overlay');
    });

    it('renders both headings',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);
        const headingElements = screen.getAllByRole('heading');
        expect(headingElements.length).toBeGreaterThanOrEqual(2);
    });

    it('includes the text "A Room Without" in the first heading',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);

        expect(screen.getByTestId("rome-without-h1")).toBeInTheDocument();
    });

    it('includes a styled span with class "text-primary" containing the word "Books"',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);
        const spanElement = screen.getByTestId('span-book');
        expect(spanElement).toBeInTheDocument();
        expect(spanElement).toHaveClass('text-primary');
    });

    it('renders the phrase "Like a Body Without Soul" in the second heading',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);
        expect(screen.getByText('Like a Body Without Soul')).toBeInTheDocument();
    });

    it('ensures both parts of the quote are part of separate headings',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);
        const firstPart = screen.getByText('A Room Without',{exact: false});
        const secondPart = screen.getByText('Like a Body Without Soul',{exact: false});

        expect(firstPart.tagName).toBe('H1');
        expect(secondPart.tagName).toBe('H1');
        expect(firstPart).not.toBe(secondPart);
    });

    it('ensures the headings are in correct order',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);
        const headings = screen.getAllByRole('heading');
        expect(headings[0].textContent).toEqual(' A Room Without  Books  is ');
        expect(headings[1].textContent).toEqual('  Like a Body Without Soul');
    });

    // Uncommented and additional tests for SearchInputForm if it were present in the code.
    /* test('SearchInputForm renders and can handle input changes', () => {
      // Function mocks for event handlers
      const handleInputChange = jest.fn();
      const handleSearchClick = jest.fn();
  
      render(
        <SearchInputForm
          darkShadow={true}
          onInputChange={handleInputChange}
          onSearchClick={handleSearchClick}
        />
      );
  
      // Test if SearchInputForm is in the document
      // Simulate input change
      // Simulate button click
      // Expect handleInputChange and handleSearchClick to have been called
    }); */

    test('renders Footer',() => {
        render(<MemoryRouter initialEntries={['/']}><HomePage /></MemoryRouter>);
        expect(screen.getByTestId('footer')).toBeInTheDocument(); // Assuming Footer component has data-testid='footer'
    });

    // Uncomment if ProductListing is to be tested after uncommenting the actual ProductListing component
    /* test('renders ProductListing if uncommented', () => {
      render(<HomePage />);
      expect(screen.getByTestId('product-listing')).toBeInTheDocument(); // Assuming ProductListing has a data-testid='product-listing'
    }); */
});
