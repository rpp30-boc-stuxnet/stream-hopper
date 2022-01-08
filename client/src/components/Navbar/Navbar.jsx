import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';

// navbar, currently assumes user is logged in
export default function Navbar(props) {

  return (
    <nav className='navbar' >
      <Link to={'/homepage'}>
        <span className='navLogo' >streamhopper!</span>
      </Link>
      <SearchBar />
      <Link to={'/homepage'}>
        <span className='homeLink' >homepage</span>
      </Link>
      <button
        className='logoutBtn'
        onClick={props.handleLogout} >
          Logout
      </button>
    </nav>
  )
}
