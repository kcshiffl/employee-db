import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import logo from '../../logo.png'

function Home() {
  return (
  <div>

    <div className='header'>
      <a href="/" className='header-left'>
        <img src={logo} style={{maxHeight: '40px'}} />
      </a>
      <div className='header-right'>
        <a href="/login" style={{color: 'white'}}><button className='button-clear'>Login</button></a>
        <a href="/signup"><button className='button-dark'>Sign Up</button></a>
      </div>
    </div>

    <div className='container'>
      <h1>Pseunotes helps teams move work forward.</h1>
      <h3>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Pseunotes.</h3>
    </div>
  </div>
  );
}

export default Home;
