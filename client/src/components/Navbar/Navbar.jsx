import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { FaHome } from 'react-icons/fa';
import ThemeToggle from '../Theme/ThemeToggle.jsx';

// navbar, currently assumes user is logged in
export default function Navbar(props) {

  return (
    <nav className='navbar' >
      <Link to={'/homepage'}>
        <span className='navLogo' >streamhopper!</span>
      </Link>
      <SearchBar />
      <div className="navBtns">
        <Link to={'/homepage'}>
          <FaHome className='homeLink' />
        </Link>
        <ThemeToggle />
        <button
          className='logoutBtn'
          onClick={props.handleLogout} >
            Logout
        </button>
      </div>
    </nav>
  )
}
