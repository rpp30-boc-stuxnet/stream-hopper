import React, { useState } from 'react';
import axios from 'axios';

const AddReview = (props) => {

  const [review, setReview] = useState('');

  const textAreaCSS = {
    height: '200px',
    fontSize: '20px',
    width: '60%',
    color: 'black'
  }

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
      console.log('successfully posted new review');
      props.handleNewReview();
    })
    .catch ((err) => {
      console.log('[AddReview] Error while posting new review: ', err);
    })
  }

  const handleReviewChange = (e) => {
    console.log(e.target.value);
    setReview(e.target.value);
  }


  return (
    <div>
      <form>
        <textarea name='newReview' onChange={handleReviewChange} style={textAreaCSS} placeholder='Type your review here (maximum of 300 characters)' rows='10' maxLength='300'></textarea>
        <button onClick={handleReviewSubmit}>Submit Review</button>
        <button onClick={props.handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default AddReview;