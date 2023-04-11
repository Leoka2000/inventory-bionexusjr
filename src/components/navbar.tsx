import React from 'react';
import Logo from '../assets/logo-2.png'
import './navbar.css';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <img src={Logo}/>
      </Link>
      <p>BioNexus's Inventory Management</p>
      <p className='responsive-p'></p>
    </nav>
  );
};

export default Navbar;
