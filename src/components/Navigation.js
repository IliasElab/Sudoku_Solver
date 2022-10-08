import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink to="/" className='navlink'><img src="/home.png" alt="Home" width="60" height="60"/></NavLink>
            <NavLink to="/about" className='navlink'>About</NavLink>
        </div>
    );
};

export default Navigation;