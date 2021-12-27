import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig.js';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, linkWithCredential }  from 'firebase/auth';


const LoginOrSignup = (props) => {

  const [loginError, setLoginError] = useState(0);


  const firebaseLogin = (e) => {
    let provider = e.target.id === 'google-login' ? new GoogleAuthProvider() : new FacebookAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        props.handleSuccessfulLogin();

      }).catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          //if the google login fails, it means we need to authroize with facebook first and then link the google cred to the uid in firebase that facebook already is linked to
          //if facebook login failed, then it means we need to authorize with google and link the facebook credential to the google uid so the user will be combined under one
          const newProvider = e.target.id === 'google-login' ? new FacebookAuthProvider() : new GoogleAuthProvider();
          const credential = e.target.id === 'google-login' ? error.credential : FacebookAuthProvider.credentialFromError(error);

          signInWithPopup(auth, newProvider)
          .then((result) => {
            linkWithCredential(result.user, credential)
            .then((res) => {
              props.handleSuccessfulLogin();
            })
            .catch((err) => {
              setLoginError(1);
            })
          })
          .catch((err) => {
            setLoginError(1) ;
          })

        } else {
          setLoginError(1) ;
        }
      });
  }

  const handleErrorOk = (e) => {
    setLoginError(0);
  }

  if (loginError) {
    return (
      <div>
        <p>There was an error while logging in to Streamhopper. Please try again or use a different method. </p>
        <button onClick={handleErrorOk}>Ok</button>
      </div>
    )
  } else {
    return (

      <div>
        <p>Streamhopper - {props.protocol}</p>
        <div>
          <button onClick={props.handleXOutClick}>X</button>
        </div>
        <button onClick={firebaseLogin} id="google-login">Google</button>
        <button onClick={firebaseLogin} id="facebook-login">Facebook</button>
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
}

export default LoginOrSignup;
