/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

//component
import Welcome from '../../components/LoginComponents/Welcome.jsx';

describe ('Welcome Component Test', () => {
  test('Should be on the DOM', function () {
    render (<Welcome />)
    expect(screen.getByText('Welcome to Streamhopper')).toBeInTheDocument();
  })
  //test for pushing login button and having the correct words show up, and same for signup.
})