import React, { useState, useEffect }from 'react';
import axios from 'axios';
import AddReview from './AddReview.jsx';
import ReviewTile from './ReviewTile.jsx';

const TitleReviews = (props) => {

  const [reviews, setReviews] = useState([]);
  const [addReview, setAddReview] = useState(0);

  useEffect (() => {
    console.log('tmdb_id = ' + props.tmdb_id)
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
      console.log('[TitleReviews] Data recieved from DB: ', result.data)
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
  }

  if (!addReview)  {
    return (
      <div>
        <p>title reviews!</p>
        <div className='reviewList'>{reviews}</div>
        <button onClick={handleAddReviewClick}>Add Review</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>Title Reviews</p>
        <AddReview handleCancel={handleCancel} tmdb_id={props.tmdb_id} type={props.type} handleNewReview={handleNewReview}/>
      </div>
    )
  }

}

export default TitleReviews