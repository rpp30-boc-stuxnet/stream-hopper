import React, { useState, useEffect } from 'react';
import LoginOrSignup from './LoginOrSignup.jsx';

const Welcome = (props) => {

  const [accountState, setAccountState] = useState({
    isLoginActive: 0,
    isSignupActive: 0
  })

  const handleAccountActionClick = (event) => {
    if (event.target.textContent === 'Signup') {
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
    console.log('handling x out click....');
    let newAccountState = {
      isLoginActive: 0,
      isSignupActive: 0
    }
    setAccountState(newAccountState);
  }

  if (!accountState.isLoginActive && !accountState.isSignupActive) {
    return (
      <div>
        <p>Welcome to Stremhopper</p>
        <p>Find the best streaming services for any movie or tv show in one place</p>
        <p>Click login or signup to get started</p>
        <div>
          <button onClick={handleAccountActionClick}>Login</button>
          <button onClick={handleAccountActionClick}>Signup</button>
        </div>
      </div>
    )
  } else if (accountState.isLoginActive) {
    return (
      <LoginOrSignup protocol={'Login'} handleXOutClick={handleXOutClick} handleSuccessfulLogin={props.handleSuccessfulLogin}/>
    )
  } else if (accountState.isSignupActive) {
    return (
      <LoginOrSignup protocol={'Signup'} handleXOutClick={handleXOutClick} handleSuccessfulLogin={props.handleSuccessfulLogin}/>
    )
  } else {
    console.log('[Welcome Component] this shouldn not happen. isActiveState = ' + accountState.isLoginActive + 'isSignupActive = ' + accountState.isSignupActive)
    return(
      <p>Welcome Component - This should not happen</p>
    )
  }

}
export default Welcome;
