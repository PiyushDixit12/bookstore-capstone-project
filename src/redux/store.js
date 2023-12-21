import {configureStore} from '@reduxjs/toolkit'
import {booksReducer} from './BookSlice'
import {userAuthReducer} from './UserAuth';
import {cartReducer} from './CartSlice';
import {bookStoreApi} from '../service/bookService';
import {setupListeners} from '@reduxjs/toolkit/query';


export const store = configureStore({
    reducer: {
        books: booksReducer,
        [bookStoreApi.reducerPath]: bookStoreApi.reducer,
        user: userAuthReducer,
        cart: cartReducer,
        // books: booksReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(bookStoreApi.middleware);
    }
});

// setupListeners(store.dispatch);