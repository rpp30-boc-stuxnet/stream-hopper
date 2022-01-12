/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MyTitlesList from '../../components/MyTitles/MyTitlesList.jsx';

describe('My Titles List Component', function () {
  test('Should render titles list', function () {

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

    const removeFromMyMovies = () => {

    }

    const addToMyMovies = () => {

    }

    const app = render(<MyTitlesList
      title='My Titles'
      data_testid={1}
      removeFromMyMovies={removeFromMyMovies}
      addToMyMovies={addToMyMovies}
      movies={userMovies} />)

    app.findAllByTestId(1)
      .then((elements) => {
        expect(elements.length > 0).toBe(true);
        done();
      })
      .catch((error) => {
        throw new Error(error);
        done();
      })


  });
});