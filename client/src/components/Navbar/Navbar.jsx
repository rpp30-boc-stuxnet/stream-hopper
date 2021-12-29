import React, { useState, useEffect } from 'react';

// navbar, currently assumes user is logged in
export default function Navbar(props) {

  return (
    <nav className={'navbar'} >
      <span className={'navLogo'} >Stream Hopper</span>
      {/** Search bar will go here */}
      <span>Searchbar Here</span>
      <button
        className={'logoutBtn'}
        onClick={props.handleLogout} >
          Logout
      </button>
    </nav>
  )
}
