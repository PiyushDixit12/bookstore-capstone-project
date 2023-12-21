import React,{useContext} from 'react'
import './Navbar.css'
import {Link,NavLink,useNavigate} from 'react-router-dom'
import {path} from '../routes/RouteConstant'
import {userContext} from '../App'
import {auth} from '../firebase/firebase'
import {signOut} from 'firebase/auth'
export const Navbar = ({darkTheme,darkTextTheme}) => {

    const user = useContext(userContext);
    console.log(user);
    const navigate = useNavigate();
    const logout = () => {
        console.log("logout called")
        signOut(auth).then((val) => {
            console.log("signout successfully")
            navigate(path.Home.path);
        }).catch((err) => {
            console.log("error",err);
        });
    }
    return (

        <div className={`navbar-container ${darkTheme ? 'background-dark position-relative' : 'background-transparent'} `}>
            <div className='container flex justify-between align-center'>
                <a href="/" className='logo'> Book<span className='text-primary'>store</span> </a>
                {user?.accessToken ? <nav className='nav-links-container'>
                    <NavLink to={path.Home.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> Home</NavLink>
                    <NavLink to={path.BooksPage.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}>Books</NavLink>

                    <NavLink to={path.cart.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> cart</NavLink>      <Link className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`} onClick={logout}> logout</Link>

                </nav> : <nav className='nav-links-container'>
                    <NavLink to={path.Home.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> Home</NavLink>
                    <NavLink to={path.BooksPage.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}>Books</NavLink>
                    <NavLink to={path.Login.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> Login</NavLink>      <NavLink to={path.SignUp.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> sign up</NavLink>

                </nav>}
            </div>
        </div>
    )
}
