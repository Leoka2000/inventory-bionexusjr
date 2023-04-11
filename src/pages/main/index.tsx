import * as React from 'react';
import Hero from './hero/hero';
import { BsLinkedin } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import './hero/hero.css'

const Index = () => {
  return (
    <div className='home-wrapper'>
      <div className='sidebar'>
        <a href='https://www.linkedin.com/company/bionexusjr/' target='_blank'><BsLinkedin /></a>
        <a href='https://www.instagram.com/bionexusjr/' target='_blank'><BsInstagram /></a>
        <a href='https://linktr.ee/bionexus' target='_blank'><AiOutlineLink /></a>
      </div>
      <Hero />
    </div>
  );
}
export default Index