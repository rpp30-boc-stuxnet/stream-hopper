import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Welcome from './Welcome.jsx';
import TestHomePage from './TestHomePage.jsx'
import { auth } from '../firebase/firebaseConfig.js';
import { signOut }  from 'firebase/auth';


const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(0);

  useEffect(() => {}, [loggedIn])

  const handleSuccessfulLogin = () => {
    setLoggedIn(1);
  }

  const handleLogout = () => {
    signOut(auth)
    .then((result)=>{
      setLoggedIn(0);
    })
    .catch((err) => {
      console.log('[handleLogout] Error while logging the user out', err.code);
      setLoggedIn(0);
    })
  }

  const handleUserVerification = () => {
    if (auth.currentUser) {
      //there is a user logged into firebase. return the user's unique id so it can be sent to the server.
      return auth.currentUser.uid;
    } else {
      //there is no user logged in. Force a logout of the app.
      handleLogout();
    }
  }


  return (
    <Router>
      <Routes>
        <Route exact path="/" element={loggedIn ? <Navigate to="/homePage" /> : <Welcome handleUserVerification={handleUserVerification} handleLogout={handleLogout} handleSuccessfulLogin={handleSuccessfulLogin} />}/>
        <Route path='/homepage' element={loggedIn ? <TestHomePage handleUserVerification={handleUserVerification} handleLogout={handleLogout}/> : <Navigate to="/" />}/>
      </Routes>
    </Router>
  );
}

export default AppRouter;