import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export default function ReviewButtons({ tmdb_id }) {

  const [currentRating, setRating] = useState(null);

  const getCurrentUserRating = () => {
    axios.get('/api/thumbRatings', {
      params: {
        user_id: window.localStorage.userUID,
        tmdb_id: parseInt(tmdb_id)
      }
    })
      .then((currentUserRating) => {
        setRating(currentUserRating.data)
      })
      .catch((error) => {
        console.log('error getting current user rating: ', error);
      })
  }

  const handleUserRating = (event) => {
    axios.post('/api/thumbRatings', {
      user_id: window.localStorage.userUID,
      tmdb_id: parseInt(tmdb_id),
      prev_thumb_rating: currentRating.user_thumb_rating,
      new_thumb_rating: event.target.dataset.rating

    })
      .then((response) => {
        //console.log('success rating this title: ', response.data);
        return getCurrentUserRating();
      })
      .catch((error) => {
        console.log('error rating this title: ', error);
      })
  }

  useEffect(() => {
    getCurrentUserRating();
  }, [])

  return (
    <>
      {currentRating?.user_thumb_rating ?
        currentRating.user_thumb_rating === 'up' ?

          <>
            <p>{currentRating?.overall_thumbs_ups || 0}</p>
            <div className='votedUp' >
              <FaRegThumbsUp data-rating='up' onClick={handleUserRating} />
            </div>
            <div className='voteBtn' >
              <FaRegThumbsDown data-rating='down' onClick={handleUserRating} />
            </div>
            <p>{currentRating?.overall_thumbs_downs || 0}</p>
          </>
          :
          <>
            <p>{currentRating?.overall_thumbs_ups || 0}</p>
            <div className='voteBtn' >
              <FaRegThumbsUp data-rating='up' onClick={handleUserRating} />
            </div>
            <div className='votedDown' >
              <FaRegThumbsDown data-rating='down' onClick={handleUserRating} />
            </div>
            <p>{currentRating?.overall_thumbs_downs || 0}</p>
          </>

        :
        <>
          <p>{currentRating?.overall_thumbs_ups || 0}</p>
            <div className='voteBtn' >
              <FaRegThumbsUp data-rating='up' onClick={handleUserRating} />
            </div>
            <div className='voteBtn' >
              <FaRegThumbsDown data-rating='down' onClick={handleUserRating} />
            </div>
          <p>{currentRating?.overall_thumbs_downs || 0}</p>
        </>
      }
    </>
  )
}