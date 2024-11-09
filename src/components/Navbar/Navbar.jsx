import {  NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import{ useAuth } from './../../context/AuthContext';

export const Navbar = () => {
    const { logout } = useAuth();

    const handleLogout = async e => {
        e.preventDefault();
       await logout();
    }

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li> <Link to="/Home">SCC LIBRARY MANAGEMENT SYSTEM</Link></li>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/students">Student</NavLink></li>
                    <li><NavLink to="/books">Books</NavLink></li>
                    <li><NavLink to="/Librarian">Librarian</NavLink></li>
                </ul>
            </nav>
                <Link to="/login" onClick={handleLogout}>Logout</Link>
        </div>
     
    )
}


