/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

//component
import Welcome from '../../components/LoginComponents/Welcome.jsx';

describe ('Welcome Component Test', () => {
  test('Should be on the DOM', function () {
    render (<Welcome />)
    expect(screen.getByText('Welcome to Streamhopper')).toBeInTheDocument();
  })

  test('Should render login options when the user clicks `Login`', () => {
    render(<Welcome />)
    userEvent.click(screen.getByText('Log in'));
    expect(screen.getByText('Log in with Google')).toBeInTheDocument();
  })
  //test for pushing login button and having the correct words show up, and same for signup.
})