import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Welcome from './Welcome.jsx';
import TestHomePage from './TestHomePage.jsx'


const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(0);

  useEffect(() => {
    console.log('running after state change of loggedIn! ')
  }, [loggedIn])

  const handleSuccessfulLogin = () => {
    setLoggedIn(1);
  }

  const handleLogout = () => {
    window.sessionStorage.clear();
    setLoggedIn(0);
  }
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={loggedIn ? <Navigate to="/homePage" /> : <Welcome handleSuccessfulLogin={handleSuccessfulLogin} />}/>
        <Route path='/homepage' element={loggedIn ? <TestHomePage handleLogout={handleLogout}/> : <Navigate to="/" />}/>
      </Routes>
    </Router>
  );
}

export default AppRouter;