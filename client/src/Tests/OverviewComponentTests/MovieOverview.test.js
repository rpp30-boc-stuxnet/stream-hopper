/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

//component
import MovieOverview from '../../components/MovieOverview/movieoverview.js';

describe ('Overview Component Test', () => {
  test('Should be on the DOM', function () { //check if component renders
    render (<MovieOverview />)
    expect(screen.getByText('Where to Watch')).toBeInTheDocument();
  })

})