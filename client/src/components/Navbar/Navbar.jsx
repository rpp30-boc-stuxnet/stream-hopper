import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';

// navbar, currently assumes user is logged in
export default function Navbar(props) {

  return (
    <nav className={'navbar'} >
      <span className={'navLogo'} >Stream Hopper</span>
      {/** Search bar will go here */}
      <span><SearchBar/></span>
      <button
        className={'logoutBtn'}
        onClick={props.handleLogout} >
          Logout
      </button>
    </nav>
  )
}
