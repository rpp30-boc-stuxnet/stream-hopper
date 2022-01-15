/**
 * @jest-environment jsdom
 */


 import React from 'react';
 import '@testing-library/jest-dom';
 import { screen, render, waitFor } from '@testing-library/react';
 import TitleReviews from '../../components/MovieOverview/titleReviews/TitleReviews.jsx';
 import userEvent from '@testing-library/user-event'
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

describe('Title Reviews Component', function () {


  test('Should render the title of the movie it is passed', async function () {


    server.use(
      rest.get('/api/titleReviews', (req, res, ctx) => {
        return res(ctx.json(reviews))
      })
    )

    await act (async () => {
      render(<TitleReviews title={'Aladdin'} tmdb_id={1234} type={'movie'}/>)
    });


    await waitFor(() => {
      expect(screen.getByText('Reviews of Aladdin')).toBeInTheDocument();
    })

  });

  test('Should close out of input box when cancel is selected by user', async function () {


    server.use(
      rest.get('/api/titleReviews', (req, res, ctx) => {
        return res(ctx.json(reviews))
      })
    )

    await act (async () => {
      render(<TitleReviews title={'Aladdin'} tmdb_id={1234} type={'movie'}/>)
    });

    act (() => {
      userEvent.click(screen.getByText('Add Review'))
    })

    await waitFor(() => {
      expect(screen.getByText('Submit Review')).toBeInTheDocument();
    })



    act (() => {
      userEvent.click(screen.getByText('Cancel'))
    })

    await waitFor(() => {
      expect(screen.getByText('Add Review')).toBeInTheDocument();
    })

  });
});
