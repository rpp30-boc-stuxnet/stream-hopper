import React, { useState } from 'react';
import { auth } from './firebase/firebaseConfig.js';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, linkWithCredential, EmailAuthProvider, fetchSignInMethodsForEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword }  from 'firebase/auth';
import './LoginOrSignup.css';

const LoginOrSignup = (props) => {

  const [loginError, setLoginError] = useState({
    loginError: 0,
    errorCode: '',
  });

  const [promptManualEntry, setPromptManualEntry] = useState({
    showPrompt: 0,
    credential: ''
  });

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
    if (e.target.textContent === 'Login') {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        props.handleSuccessfulLogin();
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          //if the user is attempting to login with an email that is already linked in firebase to google or facebook,
          //then we will link their manual creds to their other login methods for them.
          const credential = EmailAuthProvider.credential(userEmail, userPassword);
          fetchSignInMethodsForEmail(userEmail)
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
        } else {
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
    } else if (accountLinkProvider === 'google') {
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
        //if the sign in with google fails, then try with email ONLY if the error is still saying there's a duplicated account
        if (err.code === 'auth/account-exists-with-different-credential') {
          setPromptManualEntry({
            showPrompt: 1,
            credential: initialCredential
          });
        } else {
          setLoginError({
            loginError: 1,
            errorCode: err.code
          });
        }
      })
    } else {
      //if the requested method = email/password, then prompt the user for the email and password and then link the email/password account with the initially submitted credential.
      setPromptManualEntry({
        showPrompt: 1,
        credential: initialCredential
      });
    }
  }

  const handleManualLink = (e) => {
    //sign in to the email/password and then link the accounts.
    signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      linkWithCredential(auth.currentUser, promptManualEntry.credential)
      .then((usercred) => {
        //link the logged in account to the initially attempted method
        setPromptManualEntry({
          showPrompt: 0,
          credential: ''
        });
        props.handleSuccessfulLogin();
      }).catch((error) => {
        console.log("Account linking error", error.code);
      });
    })
    .catch((error) => {
      setLoginError({
        loginError: 1,
        errorCode: error.code
      });
    });
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

  if (loginError.loginError) {
    return (
      <div className="loginErrorHolder">
        <p className="loginErrorInfo">There was an error while logging in to Streamhopper. Please try again or use a different method. </p>
        <p className="loginErrorInfo">Error message: {loginError.errorCode}</p>
        <button className="submitBtn" onClick={handleErrorOk}>Ok</button>
      </div>
    )
  } else if (promptManualEntry.showPrompt){
    return(
      <div>
        <p>Please enter your email address and password to continue</p>
        <div>
          <button onClick={props.handleXOutClick}>X</button>
        </div>
        <form>
          <div>
            <label htmlFor='emailAddress'>Email Address</label>
            <input type='text' name='emailAddress' onChange={handleInputChange} placeholder='Enter email address'/>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='text' name='password' onChange={handleInputChange} placeholder='Enter password'/>
          </div>
        </form>
        <button onClick={handleManualLink}>Continue</button>
      </div>
    )
  } else {
    return (

      <div className="loginFormHolder">
        <div className="loginTitleHolder">
          <button className="closeOutButton" onClick={props.handleXOutClick}>X</button>
        </div>
        <p className="loginTitle">{props.protocol} with Streamhopper</p>
        <div>
          <button className="googleLogin" onClick={handleGoogleLogin} id="google-login">{props.protocol} with Google</button>
        </div>
        <div>
          <button className="facebookLogin" onClick={handleFacebookLogin} id="facebook-login">{props.protocol} with Facebook</button>
        </div>
        <p className="loginSeparator">-OR-</p>
        <div className="manualLoginHolder">
          <form>
            <div className="manualEntryHolder">
              <div>
               <p className="manualEntryTitle">Email Address</p>
              </div>
              <input className="manualEntryInput" type='text' name='emailAddress' onChange={handleInputChange} placeholder='Enter email address'/>
            </div>
            <div className="manualEntryHolder">
              <div>
                <p className="manualEntryTitle">Password</p>
              </div>
              <input className="manualEntryInput" type='text' name='password' onChange={handleInputChange} placeholder='Enter password'/>
            </div>
          </form>
        </div>
        <button className="submitBtn" onClick={handleManualSignIn}>{props.protocol}</button>
      </div>
    )
  }
}

export default LoginOrSignup;
