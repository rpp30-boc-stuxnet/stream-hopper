import React from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';

// navbar, currently assumes user is logged in
export default function Navbar(props) {

  return (
    <nav className={'navbar'} >
      <span className={'navLogo'} >streamhopper!</span>
      {/** Search bar will go here */}
      <SearchBar />
      <button
        className={'logoutBtn'}
        onClick={props.handleLogout} >
          Logout
      </button>
    </nav>
  )
}
