import React from 'react';
import { auth } from '../firebase/firebaseConfig.js';


const TestHomePage = (props) => {

  return(
    <div>
      <p>Welcome to the user homepage of user: {auth.currentUser.uid}</p>
      <button onClick={props.handleLogout}>Logout</button>
      <button onClick={props.handleUserVerification}>Verify user session</button>
    </div>
  )
}

export default TestHomePage;