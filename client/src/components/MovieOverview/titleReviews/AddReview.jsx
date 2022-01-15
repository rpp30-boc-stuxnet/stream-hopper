import React, { useState } from 'react';
import axios from 'axios';

const AddReview = (props) => {

  const [review, setReview] = useState('');
  const [remainingChars, setRemainingChars] = useState(280);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    let user_id = window.localStorage.userEmail.split('@');
    axios.post('/api/titleReviews', {
      review_body: review,
      username: user_id[0],
      user_id: window.localStorage.userUID,
      type: props.type,
      tmdb_id: props.tmdb_id
    })
    .then((result) => {
      props.handleNewReview();
    })
    .catch ((err) => {
      console.log('[AddReview] Error while posting new review: ', err);
    })
  }

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setRemainingChars(280 - e.target.value.length);
  }


  return (
    <div className="addReviewContainer">
      <form className="addReviewForm">
        <textarea data-testid="test-userReviewInput" className="reviewText" name='newReview' onChange={handleReviewChange} placeholder='Type your review here (maximum of 280 characters)' rows='10' maxLength='280'></textarea>
        <span className="characterWarning">Characters Remaining: {remainingChars}</span>
        <div className="reviewFormBtns">
          <button className="addReviewBtn" onClick={handleReviewSubmit}>Submit Review</button>
          <button className="cancelReviewBtn" onClick={props.handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddReview;