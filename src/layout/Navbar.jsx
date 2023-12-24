import React,{useContext,useState} from 'react'
import './Navbar.css'
import {Link,NavLink,useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {path} from '../routes/RouteConstant'
import {userContext} from '../App'
import {auth} from '../firebase/firebase'
import {signOut} from 'firebase/auth'
import {MdOutlineMenuOpen} from "react-icons/md";
import {GiSplitCross} from "react-icons/gi";
import {FaShoppingCart} from "react-icons/fa";

export const Navbar = ({darkTheme,darkTextTheme}) => {
    const [isNavbarOpen,setNavbarOpen] = useState(false);
    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

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

        <div data-testid={"navbarContainer"} className={`navbar-container ${darkTheme ? 'background-dark position-relative' : 'background-transparent'} `}>
            <div className='container flex justify-between align-center'>

                <a href="/" className='logo'> Book<span className='text-primary'>store</span> </a>
                <div className={`mobile ${darkTextTheme ? 'menu-light-dark' : "menu-light"} `} onClick={toggleNavbar}>
                    <MdOutlineMenuOpen size={30} />
                </div>
                {user?.accessToken ? <nav className={`nav-links-container ${isNavbarOpen ? 'active' : ""}`}>
                    <button className='close' onClick={toggleNavbar}>  <GiSplitCross size={20} /></button>
                    <NavLink to={path.Home.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> Home</NavLink>
                    <NavLink to={path.BooksPage.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}>Books</NavLink>
                    <Link className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`} onClick={logout} data-testid={"logout"}> logout</Link>
                    <NavLink to={path.cart.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> <FaShoppingCart size={20} style={{marginTop: "5px"}} /></NavLink> 


                </nav> : <nav className={`nav-links-container ${isNavbarOpen ? 'active' : ""}`}>
                    <button className='close' onClick={toggleNavbar}> <GiSplitCross size={30} /></button>
                    <NavLink to={path.Home.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> Home</NavLink>
                    <NavLink to={path.BooksPage.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}>Books</NavLink>
                    <NavLink to={path.Login.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> Login</NavLink>      <NavLink to={path.SignUp.path} className={` ${darkTextTheme ? 'nav-links-dark' : "nav-links"}`}> sign up</NavLink>

                </nav>}


            </div>
        </div>
    )
}
