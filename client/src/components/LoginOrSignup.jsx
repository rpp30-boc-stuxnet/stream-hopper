import React from 'react';

const LoginOrSignup = (props) => {

  return (
    <div>
      <p>Streamhopper - {props.protocol}</p>
      <div>
        <button onClick={props.handleXOutClick}>X</button>
      </div>
      <button>Google</button>
      <button>Facebook</button>
      <p>-OR-</p>
      <div>
        <form>
          <div>
            <label for='username'>Username</label>
            <input type='text' name='username' placeholder='Enter Username (max 50 chars)'/>
          </div>
          <div>
            <label for='password'>Password</label>
            <input type='text' name='password' placeholder='Enter password'/>
          </div>
        </form>
        <button>{props.protocol}</button>
      </div>
    </div>
  )
}

export default LoginOrSignup;
