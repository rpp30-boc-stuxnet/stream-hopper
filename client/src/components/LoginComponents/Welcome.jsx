import React, { useState } from 'react';
import LoginOrSignup from './LoginOrSignup.jsx';
import MovieOverview from '../MovieOverview/movieoverview.js';
import './Welcome.css'

const Welcome = (props) => {

  const [accountState, setAccountState] = useState({
    isLoginActive: 0,
    isSignupActive: 0
  })
  const [test, setTestState] = useState({isActive: false});
  const handleShowTestMovieOverview = (event) =>{
    console.log(event.target.textContent, ' text content')
    if(event.target.textContent === 'Test') {

      let newTestState = {
        isActive: true
      }
      setTestState(newTestState);
    }
  }


  const handleAccountActionClick = (event) => {
    if (event.target.textContent === 'Sign up') {
      let newAccountState = {
        isLoginActive: 0,
        isSignupActive: 1
      }
      setAccountState(newAccountState);
    } else {
      let newAccountState = {
        isLoginActive: 1,
        isSignupActive: 0
      }
      setAccountState(newAccountState);
    }
  }

  const handleXOutClick = (event) => {
    let newAccountState = {
      isLoginActive: 0,
      isSignupActive: 0
    }
    setAccountState(newAccountState);
  }
  if (test.isActive) {
    return(
      <MovieOverview user_id = {'someUser'} type = {'movie'} tmdb = {634649}
      poster_path = {'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}/>
    )
  }

  if (!accountState.isLoginActive && !accountState.isSignupActive) {
    return (
      <div>
        <p>Welcome to Streamhopper</p>
        <p>Find the best streaming services for any movie or tv show in one place</p>
        <p>Click login or signup to get started</p>
        <div>
          <button onClick={handleAccountActionClick}>Login</button>
          <button onClick={handleAccountActionClick}>Signup</button>
          <button onClick={handleShowTestMovieOverview}>Test</button>
        </div>
        <div className="WelcomeBox">
          <p className="welcomeTitle" >Welcome to Streamhopper</p>
          <p className="welcomeText" >Find the best streaming services for any movie or tv show in one place</p>
          <p className="welcomeText">Click login or sign up to get started</p>
          <div className="loginButtonHolder">
            <button className="loginButton" onClick={handleAccountActionClick}>Login</button>
            <button className="loginButton" onClick={handleAccountActionClick}>Sign up</button>
          </div>
        </div>
      </div>
    )
  } else if (accountState.isLoginActive) {
    return (
      <LoginOrSignup protocol={'Login'} handleXOutClick={handleXOutClick} handleSuccessfulLogin={props.handleSuccessfulLogin} />
    )
  } else if (accountState.isSignupActive) {
    return (
      <LoginOrSignup protocol={'Sign Up'} handleXOutClick={handleXOutClick} handleSuccessfulLogin={props.handleSuccessfulLogin}/>
    )
  } else {
    console.log('[Welcome Component] this shouldn not happen. isActiveState = ' + accountState.isLoginActive + 'isSignupActive = ' + accountState.isSignupActive)
    return (
      <p>Welcome Component - This should not happen</p>
    )
  }

}
export default Welcome;
