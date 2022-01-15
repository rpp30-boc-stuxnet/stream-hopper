/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen, waitFor } from '@testing-library/react';
 import 'regenerator-runtime/runtime'
 import { act } from 'react-dom/test-utils';
 import AppRouter from '../../components/AppRouter.jsx'

//  import { signOut } from 'firebase/auth';
//  jest.mock("signOut");

var localStorageMock = (function() {

  let extraTitle = Math.floor(Math.random() * 1500000000).toString()

  return {}
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AppRouter', function () {
  test('Should render the login in page', async function () {


    await act( async () => {
      render(<AppRouter />)
    })


    await waitFor (() => {
      expect(screen.getByText('Welcome to Streamhopper')).toBeInTheDocument();
    })

  });

  // test('Should call logout when a user logs', async function () {
    // window.localStorage = {
    //   userEmail: 'test' + extraTitle + '@gmail.com',
    //   userUID: extraTitle
    // }

  //   await act( async () => {
  //     render(<AppRouter />)
  //   })


  //   await waitFor (() => {
  //     expect(screen.getByText('MY SUGGESTIONS')).toBeInTheDocument();
  //   })

  // });


});