/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import 'regenerator-runtime/runtime'
import { act } from 'react-dom/test-utils';
// import ReactDOM from 'react-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Welcome from '../../components/LoginComponents/Welcome.jsx';


//component -> having the welcome component render the login component so i don't have to pass in props.


describe('Login/Signup Tests', () => {

  test ('User should be able to log in with a previously established email address and password', async () => {

    let loggedIn = false;
    const handleSuccessfulLogin = () => {
      loggedIn = true;
      console.log('handled successful login!!!');
    }

    render(<Welcome handleSuccessfulLogin={handleSuccessfulLogin} />);

    userEvent.click(screen.getByText('Log in'));

    const input = screen.getByTestId('test-userEmailInput');
    fireEvent.change(input, {target: {value: 'cheez@gmail.com'}});
    const passwordInput = screen.getByTestId('test-passwordEntry');
    fireEvent.change(passwordInput, {target: {value: 'littletest123'}});

    await act ( async () => {
      userEvent.click(screen.getByText('Log in'))
    })


    await waitFor(() => {
      expect(loggedIn).toBe(true);
    })

  })

  test ('Facebook login should throw an error when running in incorrect enviornment', async () => {
    let loggedIn = false;
    const handleSuccessfulLogin = () => {
      loggedIn = true;
      console.log('handled successful login!!!');
    }

    render(<Welcome handleSuccessfulLogin={handleSuccessfulLogin} />);
    userEvent.click(screen.getByText('Log in'));


    await act ( async () => {
      userEvent.click(screen.getByText('Log in with Facebook'))
    })

    await waitFor(() => {
      expect(screen.getByTestId('test-loginErrorHolder')).toBeInTheDocument();
    })

  })
})