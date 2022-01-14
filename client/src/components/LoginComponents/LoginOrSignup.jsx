import React, { useState } from 'react';
import { auth } from './firebase/firebaseConfig.js';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, linkWithCredential, EmailAuthProvider, fetchSignInMethodsForEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword }  from 'firebase/auth';
import EmailValidator from './EmailValidator.jsx';

const LoginOrSignup = (props) => {

  const [loginError, setLoginError] = useState({
    loginError: 0,
    errorCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleFacebookLogin = (e) => {
    let provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        props.handleSuccessfulLogin();

      }).catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          //if the facebook login fails, then we have to assume that google sign in is the next best option because there's no way to ask firebase for a recommendation without a user email (which FB does not give you)
          linkAccounts('google', FacebookAuthProvider.credentialFromError(error));
        } else {
          setLoginError({
            loginError: 1,
            errorCode: error.code
          });
        }
    });
  }

  const handleGoogleLogin = (e) => {
    let provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        props.handleSuccessfulLogin();

      }).catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          //if the google login fails, then we need to check for what login method we should use for this user
          fetchSignInMethodsForEmail(error.email)
          .then((signInMethods) => {
            if(signInMethods[0] === 'facebook.com') {
              linkAccounts('facebook', error.credential)
            } else {
              linkAccounts('password', error.credential);
            }
          }).catch((err) => {
            setLoginError({
              loginError: 1,
              errorCode: err.code
            });
          })
        } else {
          setLoginError({
            loginError: 1,
            errorCode: error.code
          });
        }
    });
  }


  const handleManualSignIn = (e) => {
    e.preventDefault();

    if (e.target.textContent === 'Log in') {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        props.handleSuccessfulLogin();
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          //if the user is attempting to login with an email that is already linked in firebase to google or facebook,
          //then we will link their manual creds to their other login methods for them.
          const credential = EmailAuthProvider.credential(userEmail, userPassword);
          fetchSignInMethodsForEmail(auth, userEmail)
          .then((signInMethods) => {
            if (signInMethods[0] === 'facebook.com') {
              linkAccounts('facebook', credential);
            } else {
              linkAccounts('google', credential);
            }
          })
          .catch((err) => {
            setLoginError({
              loginError: 1,
              errorCode: err.code
            });
          })
        } else if (err.code === 'auth/wrong-password') {
          fetchSignInMethodsForEmail(auth, userEmail)
          .then((signInMethods) => {
            if (signInMethods[0] === 'facebook.com') {
              handleFacebookLogin()
            } else if (signInMethods[0] === 'google.com') {
              handleGoogleLogin()
            } else {
              //it's actually just the wrong password.
              setLoginError({
                loginError: 1,
                errorCode: err.code
              });
            }
          })
          .catch((err) => {
            setLoginError({
              loginError: 1,
              errorCode: err.code
            });
          })
        } else {
          console.log(err)
          setLoginError({
            loginError: 1,
            errorCode: err.code
          });
        }
      })
    } else {
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        props.handleSuccessfulLogin();
      })
      .catch((err) => {
        setLoginError({
          loginError: 1,
          errorCode: err.code
        });
      })
    }
  }

  const linkAccounts =  (accountLinkProvider, initialCredential) => {
    if (accountLinkProvider === 'facebook') {
      let provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        linkWithCredential(result.user, initialCredential)
        .then((res) => {
          props.handleSuccessfulLogin();
        })
        .catch((err) => {
          setLoginError({
            loginError: 1,
            errorCode: err.code
          });
        })
      })
      .catch((err) => {
        setLoginError({
          loginError: 1,
          errorCode: err.code
        });
      })
    } else {
      //we first try google and build in attempting with email in case google fails
      //this is the only method that needs to try two methods because FB tries this method by default but it could be the wrong method.
      let provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        linkWithCredential(result.user, initialCredential)
        .then((res) => {
          props.handleSuccessfulLogin();
        })
        .catch((err) => {
          setLoginError({
            loginError: 1,
            errorCode: err.code
          });
        })
      })
      .catch((err) => {
        setLoginError({
          loginError: 1,
          errorCode: err.code
        });
      })
    }
  }

  const handleErrorOk = (e) => {
    setLoginError({
      loginError: 0,
      errorCode: ''
    });
  }

  const handleInputChange = (e) => {
    if (e.target.name === 'emailAddress') {
      setUserEmail(e.target.value);
    } else {
      setUserPassword(e.target.value);
    }
  }

  const handleShowPasswordClick = (e) => {
    e.preventDefault();
    setShowPassword(showPassword ? false : true);
  }

  if (loginError.loginError) {
    return (
      <div className="loginErrorHolder">
        <p className="loginErrorInfo">There was an error while logging in to Streamhopper. Please try again or use a different method. </p>
        <p className="loginErrorInfo">Error message: {loginError.errorCode}</p>
        <button className="submitBtn" onClick={handleErrorOk}>Ok</button>
      </div>
    )
  } else {
    return (

      <div className="loginFormHolder">
        <div className="loginExit">
          <button className="exitBtn" onClick={props.handleXOutClick}>X</button>
        </div>
        <p className="loginTitle">{props.protocol} with Streamhopper</p>
        <div>
          <button className="googleLogin" onClick={handleGoogleLogin} id="google-login">{props.protocol} with Google</button>
        </div>
        <div>
          <button className="facebookLogin" onClick={handleFacebookLogin} id="facebook-login">{props.protocol} with Facebook</button>
        </div>
        <p className="loginSeparator">-OR-</p>
        <form className="manualLoginHolder">
          <div className="manualEntryHolder">
              <p className="manualEntryTitle">Email Address</p>
            <input data-testid="test-userEmailInput" className="manualEntryInput" type='text' name='emailAddress' onChange={handleInputChange} placeholder='Enter email address'/>
            <EmailValidator email={userEmail}/>
          </div>
          <div className="manualEntryHolder">
            <div>
              <p className="manualEntryTitle">Password</p>
            </div>
            <div>
              <input data-testid="test-passwordEntry" className="manualEntryInput" type={showPassword ? 'text':'password'} name='password' autoComplete='off' onChange={handleInputChange} placeholder='Enter password'/>
              <button style={{fontSize: '15px', background: 'lightblue', }} onClick={handleShowPasswordClick}>{showPassword ? 'Hide Password':'Show Password'}</button>
            </div>
          </div>
          <button data-testid="test-submitBtn" className="submitBtn" disabled={userEmail.includes('@') ? false : true} onClick={handleManualSignIn}>{props.protocol}</button>
        </form>
      </div>
    )
  }
}

export default LoginOrSignup;
