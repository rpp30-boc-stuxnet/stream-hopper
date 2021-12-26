import React from 'react';
import { Link } from 'react-router-dom'

const TestHomePage = (props) => {

  return(
    <div>
      <p>Welcome to the user homepage of user: {window.sessionStorage.getItem('userUID')}</p>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  )
}

export default TestHomePage;