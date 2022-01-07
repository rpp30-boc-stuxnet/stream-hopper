import React, { useState, useEffect }from 'react';
import axios from 'axios';
import AddReview from './AddReview.jsx';
import ReviewTile from './ReviewTile.jsx';

const TitleReviews = (props) => {

  const [reviews, setReviews] = useState([]);
  const [addReview, setAddReview] = useState(0);

  useEffect (() => {
    if (props.tmdb_id !== null) {
      getReviews();
    }
  },[props.tmdb_id])

  const getReviews = () => {
    axios.get('/api/titleReviews', {
      params: {
        tmdb_id: props.tmdb_id,
        type: props.type
      }
    })
    .then((result) => {
      const newReviews = result.data
      const reviewListTiles = []
      newReviews.map((review) => { return (reviewListTiles.push(<ReviewTile key={review._id} reviewBody={review.review_body} username={review.username} time={review.updatedAt}/>)) })
      setReviews(reviewListTiles)
    })
    .catch((err) => {
      console.log('[TitleReviews] Issue while retriveing data!', err);
    })
  }

  const handleAddReviewClick = (e) => {
    setAddReview(1);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setAddReview(0);
  }

  const handleNewReview = () => {
    getReviews();
    setAddReview(0);
  }

  return (
    <div className="reviewSection">
      <p>Reviews of {props.title}</p>
      <div className='reviewList'>{reviews.length > 0 ? reviews : <span className="noReviews">No reviews yet. Add one by clicking 'Add Review' below!</span>}</div>
      {addReview ? <AddReview handleCancel={handleCancel} tmdb_id={props.tmdb_id} type={props.type} handleNewReview={handleNewReview}/> : <button className="addReviewBtn" onClick={handleAddReviewClick}>Add Review</button>  }
    </div>
  )

}

export default TitleReviews