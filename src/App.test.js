
// Necessary imports for the code
import React from 'react';
import {render,screen,waitFor} from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import {store} from './redux/store';

// Import the component to be tested
import App,{userContext} from './App';

// Mocks for necessary imports that have side effects or external dependencies
jest.mock('./firebase/firebase',() => ({
  auth: {},
  myDataBase: {},
}));

jest.mock('@reduxjs/toolkit/query/react',() => ({
  createApi: jest.fn(),
  fetchBaseQuery: jest.fn()
}))
jest.mock('firebase/firestore',() => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    docs: [
      {
        data: () => ({
          carts: [
            {id: 1,product: 'Product 1'},
            // More cart items if needed for testing
          ],
        }),
      },
    ],
  }),
}));

jest.mock('firebase/auth',() => ({
  onAuthStateChanged: jest.fn(),
}));

jest.mock('react-redux',() => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

// Mock components to avoid testing their internals
jest.mock('./routes/RouteBookStore',() => () => <div>RouteBookStore Component</div>);
jest.mock('./component/loader/Loader',() => () => <div>Loader Component</div>);
jest.mock('./utils/ScrollToTop',() => ({children}) => <div>{children}</div>);


// Unit tests covering all scenarios
describe('App Component',() => {
  const setCartItemsMock = jest.fn();
  const onAuthStateChangedMock = require('firebase/auth').onAuthStateChanged;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loader when userAuth is null',() => {
    onAuthStateChangedMock.mockImplementationOnce((_,callback) => {
      callback(null); // Represents user not logged in
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Loader Component')).toBeInTheDocument();
  });

  it('renders RouteBookStore when userAuth is not null',async () => {
    onAuthStateChangedMock.mockImplementationOnce((_,callback) => {
      callback({uid: '123'}); // Represents a logged-in user
    });

    const {getDocs} = require('firebase/firestore');
    getDocs.mockResolvedValueOnce({
      docs: [{data: () => ({carts: [{id: 1,product: 'Product 1'}]})}],
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('RouteBookStore Component')).toBeInTheDocument();
    });
  });

  it('sets cart items for logged-in user',async () => {
    const dispatch = require('react-redux').useDispatch();
    dispatch.mockImplementation(() => setCartItemsMock);

    onAuthStateChangedMock.mockImplementationOnce((_,callback) => {
      callback({uid: '123'}); // Represents a logged-in user
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(setCartItemsMock).toHaveBeenCalledWith({id: 1,product: 'Product 1'});
      expect(setCartItemsMock).toHaveBeenCalledTimes(1);
    });
  });

  it('sets userAuth to an empty object when user is not present',async () => {
    onAuthStateChangedMock.mockImplementationOnce((_,callback) => {
      callback(null); // Represents user not logged in
    });

    render(
      <userContext.Provider value={{}}>
        <App />
      </userContext.Provider>
    );

    expect(onAuthStateChangedMock).toHaveBeenCalledTimes(1);
  });

  // Add more tests as needed for edge cases
});

