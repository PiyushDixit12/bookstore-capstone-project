import React from 'react';
import {render,screen} from '@testing-library/react';
import {ProductsListingAll} from './ProductsListingAll';
import {MemoryRouter} from 'react-router-dom';

describe('ProductsListingAll Component',() => {
    const books = [
        {
            title: 'Sample Book 1',
            authors: ['Author 1'],
            canonical_isbn: '1234567890',
            published_works: [{cover_art_url: 'sample-url-1'}],
        },
        {
            title: 'Sample Book 2',
            authors: ['Author 2'],
            canonical_isbn: '0987654321',
            published_works: [{cover_art_url: 'sample-url-2'}],
        },
    ];

    test('renders product listing for multiple books',() => {
        render(<MemoryRouter initialEntries={['/book-details/1234567890']}><ProductsListingAll books={books} /></MemoryRouter>);

        expect(screen.queryByText('Sample Book 1'));
        expect(screen.queryByText('Sample Book 2'));
        expect(screen.queryByText('Author 1'));
        expect(screen.queryByText('Author 2'));

        expect(screen.queryByAltText('book-img-1'));
        expect(screen.queryByAltText('book-img-2'));

    });

    test('renders product listing when no books are provided',() => {
        render(<ProductsListingAll books={[]} />);

        expect(screen.queryByText('No books available'));
    });
});
