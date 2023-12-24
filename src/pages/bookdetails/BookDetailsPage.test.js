
import {render,screen} from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import {BookDetailsPage} from './BookDetailsPage';
import {Navbar} from '../../layout/Navbar';
import {ProductDetail} from '../../layout/productdetails/ProductDetail';
import {Footer} from '../../layout/footer/Footer';

jest.mock('../../layout/Navbar',() => ({
    Navbar: jest.fn(() => null),
}));
jest.mock('../../layout/productdetails/ProductDetail',() => ({
    ProductDetail: jest.fn(() => null),
}));
jest.mock('../../layout/footer/Footer',() => ({
    Footer: jest.fn(() => null),
}));


describe('BookDetailsPage',() => {
    it('should render without crashing',() => {
        render(<BookDetailsPage />);
        expect(screen.getByTestId('book-details-page')).toBeInTheDocument();
    });

    it('should contain Navbar, ProductDetail and Footer components',() => {
        Navbar.mockImplementation(() => <div>Navbar component</div>);
        ProductDetail.mockImplementation(() => <div>ProductDetail component</div>);
        Footer.mockImplementation(() => <div>Footer component</div>);

        render(<BookDetailsPage />);

        expect(screen.getByText('Navbar component')).toBeInTheDocument();
        expect(screen.getByText('ProductDetail component')).toBeInTheDocument();
        expect(screen.getByText('Footer component')).toBeInTheDocument();


    });


});
