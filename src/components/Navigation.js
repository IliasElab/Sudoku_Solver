import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink to="/" className='navlink'>Home</NavLink>
            <NavLink to="/about" className='navlink'>About</NavLink>
        </div>
    );
};

export default Navigation;