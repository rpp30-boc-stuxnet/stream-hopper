// import React from 'react';
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { auth } from '../firebase/firebaseConfig.js';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider }  from 'firebase/auth';
// import FacebookLogin from 'react-facebook-login';

const LoginOrSignup = (props) => {

  const firebaseLogin = (e) => {
    let provider = e.target.id === 'google-login' ? new GoogleAuthProvider() : new FacebookAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        props.handleSuccessfulLogin();

      }).catch((error) => {
        // Handle Errors here.

        const errorMessage = error.message;
        console.log(errorMessage);
        //need to handle errors/inform the user of errors
      });
  }

  return (
    <div>
      <p>Streamhopper - {props.protocol}</p>
      <div>
        <button onClick={props.handleXOutClick}>X</button>
      </div>
      <button onClick={firebaseLogin} id="google-login">Google</button>
      <button onClick={firebaseLogin} id="facebook-login">Facebook</button>
      {/* <FacebookLogin
        appId="258982786173295"
        callback={responseFacebook}
        render={renderProps => (
          <button onClick={renderProps.onClick}>This is my custom FB button</button>
        )}
      /> */}
      <p>-OR-</p>
      <div>
        <form>
          <div>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' placeholder='Enter Username (max 50 chars)'/>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='text' name='password' placeholder='Enter password'/>
          </div>
        </form>
        <button>{props.protocol}</button>
      </div>
    </div>
  )
}

export default LoginOrSignup;
