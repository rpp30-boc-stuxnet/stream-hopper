/**
 * @jest-environment jsdom
 */


 import React from 'react';
 import '@testing-library/jest-dom';
 import { screen, render } from '@testing-library/react';
 import TitleReviews from '../../components/MovieOverview/titleReviews/TitleReviews.jsx';
 import { rest } from 'msw'
 import 'regenerator-runtime/runtime'
 import { setupServer } from 'msw/node'
 import { act } from 'react-dom/test-utils';



const reviews = [
  {
    _id: "61d9eec609a49d2b953f015d",
    tmdb_id: 601,
    type: "movie",
    user_id: "AExet0BaCBWGgmIK3ADd5S2nS763",
    username: "aprilmbass",
    review_body: "Gave me nightmares and made me hungry for Reese's Pieces",
    createdAt: "2022-01-08T20:06:30.181Z",
    updatedAt: "2022-01-08T20:06:30.181Z",
    __v: 0
  }
 ]


const server = setupServer()


beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())

describe('My Titles List Component', function () {




  afterEach(() => {

  });

  test('Should render titles list', function () {


    server.use(
      rest.get('/api/titleReviews', (req, res, ctx) => {
        return res(ctx.json(reviews))
      })
    )

    act (() => {
      // let container;
      // container = document.createElement('div');
      // document.body.appendChild(container);
      // ReactDOM.render(<TitleReviews title={'Aladdin'} tmdb_id={1234} type={'movie'}/>)
      render(<TitleReviews title={'Aladdin'} tmdb_id={1234} type={'movie'}/>)
    })

    expect(screen.getByText('Reviews of Aladdin')).toBeInTheDocument();

  });
});
