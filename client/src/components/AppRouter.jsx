import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Welcome from './LoginComponents/Welcome.jsx';
import { auth } from './LoginComponents/firebase/firebaseConfig.js';
import { signOut } from 'firebase/auth';
import Dashboard from './Dashboard.jsx';
import MovieOverview from './MovieOverview/movieoverview.js';
import Navbar from './Navbar/Navbar.jsx';


const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(window.localStorage.userUID ? 1 : 0 );

  const handleSuccessfulLogin = () => {
    //save userUID in localstorage. it can be accessed anywhere in the app for any axios requests that need to send it to the server to reference it in the DB
    //it will also enable the App to remember the user so the login process is less painful
    window.localStorage.setItem('userUID', auth.currentUser.uid);
    window.localStorage.setItem('userEmail', auth.currentUser.email);
    setLoggedIn(1);
  }

  const handleLogout = () => {
    signOut(auth)
      .then((result) => {
        //clear out localStorage if the user intentionally logs out
        window.localStorage.clear();
        setLoggedIn(0);
      })
      .catch((err) => {
        console.log('[handleLogout] Error while logging the user out', err.code);
        setLoggedIn(0);
      })
  }

  return (
    <Router>
      {loggedIn ? <Navbar handleLogout={handleLogout} /> : <></>}
      <Routes>
        <Route exact path='/' element={loggedIn ? <Navigate to='/homepage' /> : <Welcome handleLogout={handleLogout} handleSuccessfulLogin={handleSuccessfulLogin} />} />
        <Route path='/homepage' element={loggedIn ? <Dashboard username={window.localStorage.userEmail.split('@')[0]} className={'dashboard'} handleLogout={handleLogout} /> : <Navigate to='/' />} />
        <Route path='/details/:id/:type' element={loggedIn ? <MovieOverview handleLogout={handleLogout} /> : <Navigate to='/' />} />
        {/* <Route path='/details/:id/:type' element={ <MovieOverview handleLogout={handleLogout} /> } /> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;