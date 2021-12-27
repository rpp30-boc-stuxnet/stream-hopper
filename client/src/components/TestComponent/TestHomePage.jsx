import React from 'react';
import { auth } from '../LoginComponents/firebase/firebaseConfig.js';


const TestHomePage = (props) => {

  return(
    <div>
      <p>Welcome to the user homepage of user: {auth.currentUser.uid}</p>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  )
}

export default TestHomePage;