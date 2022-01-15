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

    const handleSuccessfulLogin = () => {
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

  test ('Google login should throw an error when running in incorrect enviornment', async () => {

    const handleSuccessfulLogin = () => {
      console.log('handled successful login!!!');
    }

    render(<Welcome handleSuccessfulLogin={handleSuccessfulLogin} />);
    userEvent.click(screen.getByText('Log in'));


    await act ( async () => {
      userEvent.click(screen.getByText('Log in with Google'))
    })

    await waitFor(() => {
      expect(screen.getByTestId('test-loginErrorHolder')).toBeInTheDocument();
    })
  })

  test ('User should be rejected if the email is associated with an external account already', async () => {


    const handleSuccessfulLogin = () => {
      console.log('handled successful login!!!');
    }

    render(<Welcome handleSuccessfulLogin={handleSuccessfulLogin} />);

    userEvent.click(screen.getByText('Log in'));

    const input = screen.getByTestId('test-userEmailInput');
    fireEvent.change(input, {target: {value: 'ashleyreischman648@gmail.com'}});
    const passwordInput = screen.getByTestId('test-passwordEntry');
    fireEvent.change(passwordInput, {target: {value: 'littletest123'}});

    await act ( async () => {
      userEvent.click(screen.getByText('Log in'))
    })


    await waitFor(() => {
      expect(screen.getByTestId('test-loginErrorHolder')).toBeInTheDocument();
    })

  })

  test ('User be notified if they enter the wrong manual password', async () => {


    const handleSuccessfulLogin = () => {
      console.log('handled successful login!!!');
    }

    render(<Welcome handleSuccessfulLogin={handleSuccessfulLogin} />);

    userEvent.click(screen.getByText('Log in'));

    const input = screen.getByTestId('test-userEmailInput');
    fireEvent.change(input, {target: {value: 'cheez@gmail.com'}});
    const passwordInput = screen.getByTestId('test-passwordEntry');
    fireEvent.change(passwordInput, {target: {value: 'little'}});

    await act ( async () => {
      userEvent.click(screen.getByText('Log in'))
    })


    await waitFor(() => {
      expect(screen.getByTestId('test-loginErrorHolder')).toBeInTheDocument();
    })

  })

  test ('A brand new user should be able to sign up', async () => {
    let loggedIn = false;
    const handleSuccessfulLogin = () => {
      loggedIn = true;
      console.log('handled successful login!!!');
    }


    render(<Welcome handleSuccessfulLogin={handleSuccessfulLogin} />);

    userEvent.click(screen.getByText('Sign up'));

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let extraTtile = getRandomInt(1500000000)
    let email = 'test' + extraTtile.toString() + '@gmail.com'

    const input = screen.getByTestId('test-userEmailInput');
    fireEvent.change(input, {target: {value: email}});
    const passwordInput = screen.getByTestId('test-passwordEntry');
    fireEvent.change(passwordInput, {target: {value: 'littletest123'}});

    await act ( async () => {
      userEvent.click(screen.getByText('Sign up'))
    })


    await waitFor(() => {
      expect(loggedIn).toBe(true);
    })

  })

  test ('The error clears if the user clicks okay after incorrectly logging in.', async () => {


    const handleSuccessfulLogin = () => {
      console.log('handled successful login!!!');
    }

    render(<Welcome handleSuccessfulLogin={handleSuccessfulLogin} />);

    userEvent.click(screen.getByText('Log in'));

    const input = screen.getByTestId('test-userEmailInput');
    fireEvent.change(input, {target: {value: 'cheez@gmail.com'}});
    const passwordInput = screen.getByTestId('test-passwordEntry');
    fireEvent.change(passwordInput, {target: {value: 'little'}});

    await act ( async () => {
      userEvent.click(screen.getByText('Log in'))
    })


    await waitFor(() => {
      expect(screen.getByTestId('test-loginErrorHolder')).toBeInTheDocument();
    })

    await act ( async () => {
      userEvent.click(screen.getByText('Ok'))
    })

    await waitFor(() => {
      expect(screen.getByText('Show Password')).toBeInTheDocument();
    })

  })


})