
import React from 'react';
import {fireEvent,render,screen,waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import BookSliceReducer from '../../redux/BookSlice';
import {BookPage} from './BookPage';
import bookService from '../../service/bookService';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

// Mock the bookService
const {useGetAllBooksQuery} = bookService;
jest.mock('../../service/bookService',() => ({
    useGetAllBooksQuery: jest.fn(),
}));
jest.mock('firebase/auth',() => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn()

}));
// Dummy book data
const booksData = {
    results: [
        {id: 1,title: 'Book 1',authors: 'Author 1',book_type: 'fiction',book_categories: 'Mystery & Suspense'},
        {id: 2,title: 'Book 2',authors: 'Author 2',book_type: 'nonfiction',book_categories: 'Science & Technology'},
        // More books as required...
    ],
};

// Mock Redux store
const store = configureStore({
    reducer: {
        books: BookSliceReducer,
    },
});

// Mock the API call
const server = setupServer(
    rest.get('/books',(req,res,ctx) => {
        return res(ctx.json(booksData));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Define your tests
describe('BookPage',() => {
    it('renders Navbar, SearchInputForm, and Footer components',() => {
        useGetAllBooksQuery.mockReturnValue({data: null,isLoading: false,isError: false,isFetching: false});
        render(
            <Provider store={store}>
                <BookPage />
            </Provider>
        );

        // Expect components to be present in the document
        expect(screen.getByText(/Find the Books that you want/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search books by name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search books by author')).toBeInTheDocument();
        // Add further checks for other parts of the UI...
    });

    it('displays loading state initially',() => {
        useGetAllBooksQuery.mockReturnValue({data: null,isLoading: true,isError: false,isFetching: true});
        render(
            <Provider store={store}>
                <BookPage />
            </Provider>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('displays books when load is successful',async () => {
        useGetAllBooksQuery.mockReturnValue({data: booksData,isLoading: false,isError: false,isFetching: false});
        render(
            <Provider store={store}>
                <BookPage />
            </Provider>
        );

        expect(await screen.findAllByText(/Book/i)).toHaveLength(booksData.results.length);
    });

    it('displays error message when load fails',() => {
        useGetAllBooksQuery.mockReturnValue({data: null,isLoading: false,isError: true,isFetching: false});
        render(
            <Provider store={store}>
                <BookPage />
            </Provider>
        );

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    it('searches for books by name',async () => {
        useGetAllBooksQuery.mockReturnValue({data: booksData,isLoading: false,isError: false,isFetching: false});
        render(
            <Provider store={store}>
                <BookPage />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Search books by name'),{target: {value: 'Book 1'}});
        fireEvent.click(screen.getByText(/Search/i));

        await waitFor(() => {
            expect(screen.getByText(/Book 1/i)).toBeInTheDocument();
        });
    });

    // Similar tests for searching by author, categories, and types...

    it('displays no data message when no books match the search',() => {
        useGetAllBooksQuery.mockReturnValue({data: {results: []},isLoading: false,isError: false,isFetching: false});
        render(
            <Provider store={store}>
                <BookPage />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Search books by name'),{target: {value: 'Nonexistent Book'}});
        fireEvent.click(screen.getByText(/Search/i));

        expect(screen.getByText(/No data found/i)).toBeInTheDocument();
    });
});
