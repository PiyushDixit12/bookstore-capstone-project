import React,{useContext} from 'react'
import {Route,Routes} from 'react-router-dom'
// import {Layout} from '../component/Layout'
import {HomePage} from '../pages/home/HomePage'
import {path} from './RouteConstant'
import {BookPage} from '../pages/bookpage/BookPage'
import {BookDetailsPage} from '../pages/bookdetails/BookDetailsPage'
import {Login} from '../pages/Login/Login'
import {SignUp} from '../pages/signup/SignUp'
import {Cart} from '../pages/cart/Cart'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {userContext} from '../App'

export const RouteBookStore = () => {

    const user = useContext(userContext);
    return (
        <div>
            <Routes>
                <Route path={path.Home.path} element={<HomePage />} />
                <Route path={path.BooksPage.path} element={<BookPage />} />
                <Route path={path.BookDetailsPage.path} element={<BookDetailsPage />} />
                <Route path={"/*"} element={<> NO Page Availabel</>} />

                {user?.accessToken ? <Route path={path.cart.path} element={<Cart />} /> : <><Route path={path.Login.path} element={<Login />} />
                    <Route path={path.SignUp.path} element={<SignUp />} /></>}


            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </div>
    )
}

