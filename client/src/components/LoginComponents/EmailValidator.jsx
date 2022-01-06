import React from 'react';
import './LoginOrSignup.css';

const EmailValidator = (props) => {
  if(props.email.includes('@') || props.email === '') {
    return(null);
  } else {
    return (
      <div className="emailValidator">
        <p>Please enter a valid email address</p>
      </div>
    )
  }
}

export default EmailValidator;