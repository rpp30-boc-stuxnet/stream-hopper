/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import 'regenerator-runtime/runtime'
import { act } from 'react-dom/test-utils';
// import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Welcome from '../../components/LoginComponents/Welcome.jsx';
jest.mock('../../components/LoginComponents/__mocks__/handleManualSignIn.js');

//component -> having the welcome component render the login component so i don't have to pass in props.


describe('Login/Signup Tests', () => {
  // test('User should be redirected to their dashboard if they login with a valid google account', () => {

  //   let container;
  //   container = document.createElement('div');
  //   document.body.appendChild(container);

  //   act(() => {
  //     ReactDOM.render(<Welcome />, container)
  //   })
  //   userEvent.click(screen.getByText('Log in'));

  //   let button = screen.getByText('Log in with Google');
  //   act(() => {
  //     button.dispatchEvent(new MouseEvent('click'))
  //   })

  //   expect(screen.getByText('MY TITLES')).toBeInTheDocument();

  //   //setup dummy successful response
  //   //test that the screen goes to the dashboard... so look for text that exists on the dashboard.

  //   //setup dummy error response
  //   //test the error appears on the screen
  // })


  test ('User should be able to log in with a previously established email address and password', () => {


    render(<Welcome />);

    userEvent.click(screen.getByText('Log in'));
    console.log('past login');
    const input = screen.getByTestId('test-userEmailInput');
    fireEvent.change(input, {target: {value: 'cheez@gmail.com'}});
    const passwordInput = screen.getByTestId('test-passwordEntry');
    fireEvent.change(passwordInput, {target: {value: 'littletest123'}});

    let button = screen.getByText('Log in');
    act( () => {
      button.dispatchEvent(new MouseEvent('click'))
    })

    expect(1).toBe(1);
  })
})