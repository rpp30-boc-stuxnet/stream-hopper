
/**
 * @jest-environment jsdom
 */

//dependencies
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReviewTile from '../../components/MovieOverview/titleReviews/ReviewTile.jsx';

//for Reference
{/* <ReviewTile key={review._id} reviewBody={review.review_body} username={review.username} time={review.updatedAt}/> */}

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


describe('Review Tile Component', function () {
  test('Should render given data in a tile',  function () {

    render(<ReviewTile key={review._id} reviewBody={review.review_body} username={review.username} time={review.updatedAt}/>)

    expect(screen.getByText('aprilmbass')).toBeInTheDocument();

  });

});