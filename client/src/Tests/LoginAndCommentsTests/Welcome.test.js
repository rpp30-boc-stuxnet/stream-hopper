

/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

//component
import Welcome from '../../components/LoginComponents/Welcome.jsx';

describe ('Welcome Component Test', () => {
  test('Should be on the DOM', function () {
    render (<Welcome />)
    expect(screen.getByText('Welcome to Streamhopper')).toBeInTheDocument();
  })

  test('Should render login options when the user clicks `Log in`', () => {
    render(<Welcome />)
    userEvent.click(screen.getByText('Log in'));
    expect(screen.getByText('Log in with Google')).toBeInTheDocument();
  })

  test('Should render login options when the user clicks `Sign up`', () => {
    render(<Welcome />)
    userEvent.click(screen.getByText('Sign up'));
    expect(screen.getByText('Sign up with Google')).toBeInTheDocument();
  })

  test('Clicking the `x` button should lead back to the welcome page.', () => {
    render(<Welcome />)
    userEvent.click(screen.getByText('Sign up'));
    expect(screen.getByText('Sign up with Google')).toBeInTheDocument();

    userEvent.click(screen.getByText('X'));
    expect(screen.getByText('Welcome to Streamhopper')).toBeInTheDocument();
  })

  test('Entering an invalid email causes the email warning to render and the log in button to be disabled', () => {
    render(<Welcome />)

    userEvent.click(screen.getByText('Sign up'));
    const input = screen.getByTestId('test-userEmailInput');
    fireEvent.change(input, {target: {value: 'ashley'}});
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(screen.getByTestId('test-submitBtn')).toBeDisabled();
  })

  test('clicking on the `show password` should chnage the type of the password box to `text`. Clicking it again should change it back.', () => {
    render(<Welcome />)

    userEvent.click(screen.getByText('Sign up'));

    const passwordInput = screen.getByTestId('test-passwordEntry');
    fireEvent.change(passwordInput, {target: {value: 'hello'}});
    userEvent.click(screen.getByText('Show Password'));
    expect(screen.getByTestId('test-passwordEntry')).toHaveAttribute('type','text');
    userEvent.click(screen.getByText('Hide Password'));
    expect(screen.getByTestId('test-passwordEntry')).toHaveAttribute('type','password');
  })


})