/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

//component -> having the welcome component render the login component so i don't have to pass in props.
import Welcome from '../../components/LoginComponents/Welcome.jsx';

describe('Login/Signup Tests', () => {
  // test('Google windown should open if the user selects it', () => {
  //   render(<Welcome />);

  //   userEvent.click(screen.getByText('Log in'));
  //   userEvent.click(screen.getByText('Log in with Google'));

  //   expect(screen.getByText('Log in with Google')).toBeInTheDocument();
  // })
})

//want to test that pushing google button brings up a popup, same for FB
//want to test that doing something wrong renders an error on the screen
//want to test that pushing ok on that error brings you back to the main page
//Want to test that entering your email and password and clicking okay leads to a manual user sign in.
//i do not know how to do any of that, so this will wait for tomorrow.

///also need to test appRouter
///also need to test the titleReviews