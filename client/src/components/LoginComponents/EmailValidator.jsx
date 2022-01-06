import React from 'react';

const EmailValidator = (props) => {

  const emailValidatorCss = {
    fontSize: '15px',
    color: 'red',
    fontStyle: 'italic'
  }

  if(props.email.includes('@') || props.email === '') {
    return(null);
  } else {
    return (
      <div className="emailValidator" style={emailValidatorCss}>
        <p>Please enter a valid email address</p>
      </div>
    )
  }
}

export default EmailValidator;