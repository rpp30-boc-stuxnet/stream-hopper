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
      .catch((err) => {
        console.log('[AddReview] Error while posting new review: ', err);
      })
  }

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setRemainingChars(280 - e.target.value.length);
  }


  return (
    <div>
      <form>
        <textarea className="reviewText" name='newReview' onChange={handleReviewChange} placeholder='Type your review here (maximum of 280 characters)' rows='10' maxLength='280'></textarea>
      </form>
      <span className="characterWarning">Characters Remaining: {remainingChars}</span>
      <br></br>
      <button className="addReviewBtn" onClick={handleReviewSubmit}>Submit Review</button>
      <button className="addReviewBtn" onClick={props.handleCancel}>Cancel</button>
    </div>
  );
}

export default AddReview;