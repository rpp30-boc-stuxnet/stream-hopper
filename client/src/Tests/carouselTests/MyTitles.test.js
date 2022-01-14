/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyTitlesList from '../../components/MyTitles/MyTitlesList.jsx';
import { rest } from 'msw'
import 'regenerator-runtime/runtime'
import { setupServer } from 'msw/node'
import { act } from 'react-dom/test-utils';

let userMovies = [
  {
    "_id": "61c218b65ccc68c0a27c1c0d",
    "user_id": "user3",
    "type": "movie",
    "tmdb_id": 634649,
    "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "createdAt": "2021-12-21T18:11:02.569Z",
    "updatedAt": "2021-12-21T18:11:02.569Z",
    "__v": 0,
    "saved_by_user": true
  },
  {
    "_id": "61c2188a5ccc68c0a27c1c09",
    "user_id": "user3",
    "type": "tv",
    "tmdb_id": 73586,
    "poster_path": "https://image.tmdb.org/t/p/w500/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
    "createdAt": "2021-12-21T18:10:18.567Z",
    "updatedAt": "2021-12-21T18:10:18.567Z",
    "__v": 0,
    "saved_by_user": true
  },
  {
    "_id": "61c21216830e32670425c966",
    "user_id": "user3",
    "type": "tv",
    "tmdb_id": 131927,
    "poster_path": "https://image.tmdb.org/t/p/w500/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
    "createdAt": "2021-12-21T17:42:46.557Z",
    "updatedAt": "2021-12-21T17:42:46.557Z",
    "__v": 0,
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

describe('My Titles List Component', function () {
  test('Should render titles list', async function () {


    const removeFromMyMovies = () => {

    }

    const addToMyMovies = () => {

    }

    server.use(
      rest.get('/api/thumbRatings', (req, res, ctx) => {
        return res(ctx.json(currentRating))
      })
    )

    await act(
      async () =>
      render(
        <BrowserRouter>
          <MyTitlesList
            title='My Titles'
            data_testid={1}
            removeFromMyMovies={removeFromMyMovies}
            addToMyMovies={addToMyMovies}
            movies={userMovies} />
        </BrowserRouter>)
    )

    let elements = await screen.findAllByTestId(1);
    expect(elements.length > 0).toBe(true);

  });
});