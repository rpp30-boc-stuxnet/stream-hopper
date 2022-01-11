import React, { useState } from 'react';
import LoginOrSignup from './LoginOrSignup.jsx';
const Welcome = (props) => {

  const [accountState, setAccountState] = useState({
    isLoginActive: 0,
    isSignupActive: 0
  })

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

  if (!accountState.isLoginActive && !accountState.isSignupActive) {
    return (

      <div className="welcomeBox">
        <div className="welcomeFader"></div>
        <p className="welcomeTitle" >Welcome to Streamhopper</p>
        <p className="welcomeText" >Find the best streaming services for any movie or tv show in one place</p>
        <p className="welcomeText">Click login or sign up to get started</p>
        <div className="loginButtonHolder">
          <button className="loginButton" onClick={handleAccountActionClick}>Log in</button>
          <button className="loginButton" onClick={handleAccountActionClick}>Sign up</button>
        </div>
      </div>

    )
  } else if (accountState.isLoginActive) {
    return (
      <LoginOrSignup protocol={'Log in'} handleXOutClick={handleXOutClick} handleSuccessfulLogin={props.handleSuccessfulLogin} />
    )
  } else {
    return (
      <LoginOrSignup protocol={'Sign up'} handleXOutClick={handleXOutClick} handleSuccessfulLogin={props.handleSuccessfulLogin}/>
    )
  }
}

export default Welcome;
