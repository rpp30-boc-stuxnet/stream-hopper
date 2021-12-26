import React from 'react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider }  from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const LoginOrSignup = (props) => {

  const googleLogin = () => {

    const firebaseConfig = {
      apiKey: "AIzaSyBa8Qq6QRdsUIdcCGbFGdCwjlMKHesWanI",
      authDomain: "stuxnet-boc-rpp30.firebaseapp.com",
      projectId: "stuxnet-boc-rpp30",
      storageBucket: "stuxnet-boc-rpp30.appspot.com",
      messagingSenderId: "916683907756",
      appId: "1:916683907756:web:64912631b6e6d77105f509",
      measurementId: "G-64RFV7ZW0E"
    };

    initializeApp(firebaseConfig);
    const auth = getAuth();
    let provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        window.sessionStorage.setItem('userUID',result.user.uid);
        //send the user up to the server

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
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
      <button onClick={googleLogin}>Google</button>
      <button>Facebook</button>
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
