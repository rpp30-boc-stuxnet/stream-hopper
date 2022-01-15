
/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddReview from '../../components/MovieOverview/titleReviews/AddReview.jsx';
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

//for Reference
{/* <AddReview
          handleCancel={handleCancel}
          tmdb_id={props.tmdb_id}
          type={props.type}
          handleNewReview={handleNewReview}/> */}

const review = {
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


const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('Review Tile Component', function () {
  test('Should render a submit button',  function () {


    const handleCancel = () => {

    }
    const handleNewReview = () => {

    }

    render(<AddReview handleCancel={handleCancel} handleNewReview={handleNewReview} type={review.type} tmdb_id={review.tmdb_id}/>)

    expect(screen.getByText('Submit Review')).toBeInTheDocument();

  });

  test('Should call handle cancel button when cancel button is clicked',  function () {
    let isCanceled = false;

    const handleCancel = (e) => {
      e.preventDefault();
      isCanceled = true;
    }
    const handleNewReview = () => {

    }

    render(<AddReview handleCancel={handleCancel} handleNewReview={handleNewReview} type={review.type} tmdb_id={review.tmdb_id}/>)
    userEvent.click(screen.getByText('Cancel'));

    expect(isCanceled).toBe(true);

  });

  test('Should modify the # of characters left as user enters words into the review box',  function () {


    const handleCancel = (e) => {

    }
    const handleNewReview = () => {

    }

    render(<AddReview handleCancel={handleCancel} handleNewReview={handleNewReview} type={review.type} tmdb_id={review.tmdb_id}/>)
    const input = screen.getByTestId('test-userReviewInput');
    fireEvent.change(input, {target: {value: 'Entering a review :)'}});

    expect(screen.getByText('Characters Remaining: 260')).toBeInTheDocument();

  });

  test('Should call handleNewReview when a new review is submitted',  function () {
    let isNewReview = false;

    const handleCancel = (e) => {

    }
    const handleNewReview = () => {
      isNewReview = true;
    }

    server.use(
      rest.post('/api/titleReviews', (req, res, ctx) => {
        return res(ctx.status(201))
      })
    );

    render(<AddReview handleCancel={handleCancel} handleNewReview={handleNewReview} type={review.type} tmdb_id={review.tmdb_id}/>)
    const input = screen.getByTestId('test-userReviewInput');
    fireEvent.change(input, {target: {value: 'Entering a review :)'}});
    userEvent.click(screen.getByText('Submit Review'));

    expect(isNewReview).toBe(true);

  });

});