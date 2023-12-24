
import React from 'react';
import {render,screen} from '@testing-library/react';
// import '@te/sting-library/jest-dom/extend-expect';
import {Cart} from './Cart';
import {Navbar} from '../../layout/Navbar';
import {Footer} from '../../layout/footer/Footer';
import {CartItemsContainer} from '../../layout/cartitemContainer/CartItemsContainer';

jest.mock('../../layout/Navbar',() => ({
    Navbar: jest.fn(() => null)
}));

jest.mock('../../layout/footer/Footer',() => ({
    Footer: jest.fn(() => null)
}));

jest.mock('../../layout/cartitemContainer/CartItemsContainer',() => ({
    CartItemsContainer: jest.fn(() => null)
}));

describe('Cart Page',() => {
    it('should render without crashing',() => {
        render(<Cart />);
    });

    it('should render the Navbar component with correct props',() => {
        Navbar.mockImplementation(() => <div data-testid="navbar"></div>);

        render(<Cart />);

        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(Navbar).toHaveBeenCalledWith({darkTheme: true},{});
    });

    it('should render the CartItemsContainer component',() => {
        CartItemsContainer.mockImplementation(() => <div data-testid="cartitemscontainer"></div>);

        render(<Cart />);

        expect(screen.getByTestId('cartitemscontainer')).toBeInTheDocument();
        expect(CartItemsContainer).toHaveBeenCalled();
    });

    it('should render the Footer component',() => {
        Footer.mockImplementation(() => <div data-testid="footer"></div>);

        render(<Cart />);

        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(Footer).toHaveBeenCalled();
    });

    it('should match snapshot',() => {
        Navbar.mockImplementation(() => <div>Navbar</div>);
        CartItemsContainer.mockImplementation(() => <div>CartItemsContainer</div>);
        Footer.mockImplementation(() => <div>Footer</div>);

        const {asFragment} = render(<Cart />);

        expect(asFragment()).toMatchSnapshot();
    });
});
