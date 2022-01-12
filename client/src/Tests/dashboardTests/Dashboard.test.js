/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Dashboard from '../../components/Dashboard.jsx';

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

let userSuggestions = [
  {
    "type": "movie",
    "tmdb_id": 511809,
    "poster_path": "https://image.tmdb.org/t/p/w500/zeAZTPxV5xZRNEX3rZotnsp7IVo.jpg",
    "saved_by_user": false
  },
  {
    "type": "tv",
    "tmdb_id": 97951,
    "poster_path": "https://image.tmdb.org/t/p/w500/si7bdZDEmdqJAMGutAIzcfqVQTw.jpg",
    "saved_by_user": false
  },
  {
    "type": "movie",
    "tmdb_id": 593395,
    "poster_path": "https://image.tmdb.org/t/p/w500/4wQ3TFoV17DdSiEJQlaEKtU8UVT.jpg",
    "saved_by_user": false
  },
  {
    "type": "tv",
    "tmdb_id": 66025,
    "poster_path": "https://image.tmdb.org/t/p/w500/wOPVaXMZ61Z0t2QezdQWvZbPCLi.jpg",
    "saved_by_user": false
  },
  {
    "type": "tv",
    "tmdb_id": 71146,
    "poster_path": "https://image.tmdb.org/t/p/w500/28cIK70tN2t4gPTV8CBQZED1H2G.jpg",
    "saved_by_user": false
  }
]

let spielbergTitles = [
  {
    "type": "movie",
    "tmdb_id": 329,
    "poster_path": "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    "saved_by_user": true
  },
  {
    "type": "movie",
    "tmdb_id": 857,
    "poster_path": "https://image.tmdb.org/t/p/w500/1wY4psJ5NVEhCuOYROwLH2XExM2.jpg",
    "saved_by_user": false
  },
  {
    "type": "movie",
    "tmdb_id": 333339,
    "poster_path": "https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
    "saved_by_user": false
  },
  {
    "type": "movie",
    "tmdb_id": 424,
    "poster_path": "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    "saved_by_user": false
  },
  {
    "type": "movie",
    "tmdb_id": 640,
    "poster_path": "https://image.tmdb.org/t/p/w500/ctjEj2xM32OvBXCq8zAdK3ZrsAj.jpg",
    "saved_by_user": false
  }
]

let trendingTitles = [
  {
    "type": "movie",
    "tmdb_id": 634649,
    "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "saved_by_user": true
  },
  {
    "type": "movie",
    "tmdb_id": 624860,
    "poster_path": "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
    "saved_by_user": false
  },
  {
    "type": "movie",
    "tmdb_id": 646380,
    "poster_path": "https://image.tmdb.org/t/p/w500/th4E1yqsE8DGpAseLiUrI60Hf8V.jpg",
    "saved_by_user": false
  },
  {
    "type": "movie",
    "tmdb_id": 460458,
    "poster_path": "https://image.tmdb.org/t/p/w500/6WR7wLCX0PGLhj51qyvK8MIxtT5.jpg",
    "saved_by_user": false
  },
  {
    "type": "tv",
    "tmdb_id": 115036,
    "poster_path": "https://image.tmdb.org/t/p/w500/gNbdjDi1HamTCrfvM9JeA94bNi2.jpg",
    "saved_by_user": false
  }
]

const handleLogout = () => {
  signOut(auth)
    .then((result) => {
      //clear out localStorage if the user intentionally logs out
      window.localStorage.clear();
      setLoggedIn(0);
    })
    .catch((err) => {
      console.log('[handleLogout] Error while logging the user out', err.code);
      setLoggedIn(0);
    })
}

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Dashboard Component', function () {
  test('Should render dashboard component', function (done) {
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
      })
    );
    const app = render(<Dashboard className={'dashboard'} handleLogout={handleLogout} />)
    expect(app.getByText('Hello')).toBeInTheDocument();
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