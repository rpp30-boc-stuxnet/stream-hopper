/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Dashboard from '../../components/Dashboard.jsx';
import 'regenerator-runtime/runtime'
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

let userMovies = [
  {
    "_id": "61c218b65ccc68c0a27c1c0d",
    "user_id": "sMkYKkxU3lV6VfHoPDezG2JsaRs1",
    "type": "movie",
    "tmdb_id": 634649,
    "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "createdAt": "2021-12-21T18:11:02.569Z",
    "updatedAt": "2021-12-21T18:11:02.569Z",
    "__v": 0,
    "saved_by_user": true
  }
]

let userSuggestions = [
  {
    "type": "movie",
    "tmdb_id": 511809,
    "poster_path": "https://image.tmdb.org/t/p/w500/zeAZTPxV5xZRNEX3rZotnsp7IVo.jpg",
    "saved_by_user": false
  }
]

let spielbergTitles = [
  {
    "type": "movie",
    "tmdb_id": 329,
    "poster_path": "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    "saved_by_user": true
  }
]

let trendingTitles = [
  {
    "type": "movie",
    "tmdb_id": 634649,
    "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "saved_by_user": true
  }
]

let currentRating = {
  "user_id": "User3",
  "tmdb_id": 329,
  "user_thumb_rating": "up",
  "overall_thumbs_ups": 50,
  "overall_thumbs_downs": 20
}

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Dashboard Component', function () {
  test('Should render dashboard component', async function () {

    const handleLogout = () => {
    }

    server.use(
      rest.get('/api/savedTitles', (req, res, ctx) => {
        return res(ctx.json(userMovies))
      }),
      rest.get('/api/relatedTitles', (req, res, ctx) => {
        return res(ctx.json(userSuggestions))
      }),
      rest.get('/api/spielbergTitles', (req, res, ctx) => {
        return res(ctx.json(spielbergTitles))
      }),
      rest.get('/api/trendingTitles', (req, res, ctx) => {
        return res(ctx.json(trendingTitles))

      }),
      rest.get('/api/thumbRatings', (req, res, ctx) => {
        return res(ctx.json(currentRating))

      })
    );

    await act (async () => {
      render(<BrowserRouter><Dashboard username={'anna'} className={'dashboard'} handleLogout={handleLogout} /></BrowserRouter>)
    });


    await waitFor(() => {
      expect(screen.getByText('Hello anna')).toBeInTheDocument();
    })

  });

});