import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleSignIn = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log('error', error.message))
    }
    return (
        <nav className='header'>
            <Link to="/"><img src={logo} alt="" /></Link>
            <div className='menu'>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                {user && <span className='welcome'>{user.email} <button onClick={handleSignIn}>Sign Out</button></span>}
            </div>
        </nav>
    );
};

export default Header;