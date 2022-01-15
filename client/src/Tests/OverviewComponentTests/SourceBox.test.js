/**
 * @jest-environment jsdom
 */

// dependencies
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import 'regenerator-runtime/runtime'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

//component


// const server = setupServer()

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

describe ('Overview Component Test',  () => {

})