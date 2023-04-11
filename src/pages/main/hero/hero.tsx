import React from 'react';
import './hero.css';
import { Link } from 'react-router-dom';
import { FaToolbox } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';

const Hero: React.FC = () => {
  return (
    <section className='hero-section'>
      <Link style={{ textDecoration: 'none' }} to='/consumables'>
        <span><FaToolbox /></span>
        <p>CONSUMABLES</p>
      </Link>
      <Link style={{ textDecoration: 'none' }} to='/equipments'>
        <span><FaTools /></span>
        <p>EQUIPMENTS</p>
      </Link>
      <Link style={{ textDecoration: 'none' }} to='/employees'>
        <span><BsPersonCircle /></span>
        <p>EMPLOYEES</p>
      </Link>
    </section>
  );
};

export default Hero;

