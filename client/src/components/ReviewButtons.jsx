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
        tmdb_id: tmdb_id
      }
    })
      .then((currentUserRating) => {
        console.log('this is the current user rating: ', currentUserRating.data)
        setRating(currentUserRating.data)
      })
      .catch((error) => {
        console.log('error getting current user rating: ', error);
      })
  }

  const handleUserRating = (event) => {
    console.log('value on click: ', event.target.dataset.rating);
    axios.post('/api/thumbRatings', {
      user_id: window.localStorage.userUID,
      tmdb_id: tmdb_id,
      prev_thumb_rating: currentRating.user_thumb_rating,
      new_thumb_rating: event.target.dataset.rating

    })
      .then((response) => {
        console.log('success rating this title: ', response.data);
        return getCurrentUserRating();
      })
      .catch((error) => {
        console.log('error rating this title: ', error);
      })
  }

  useEffect(() => {
    getCurrentUserRating();
  }, [])

  //   {
  //     "user_id": "User3",
  //     "tmdb_id": 329,
  //     "user_thumb_rating": "up",
  //     "overall_thumbs_ups": 50,
  //     "overall_thumbs_downs": 20
  // }

  return (
    <>
      {currentRating?.user_thumb_rating ?
        currentRating.user_thumb_rating === 'up' ?

          <>
            <p>{currentRating?.overall_thumbs_ups || 0}</p>
            <IconContext.Provider value={{ className: 'voted' }}>
              <FaRegThumbsUp data-rating='up' onClick={handleUserRating} />
            </IconContext.Provider>
            <FaRegThumbsDown data-rating='down' onClick={handleUserRating} />
            <p>{currentRating?.overall_thumbs_downs || 0}</p>
          </>
          :
          <>
            <p>{currentRating?.overall_thumbs_ups || 0}</p>
            <FaRegThumbsUp data-rating='up' onClick={handleUserRating} />
            <IconContext.Provider value={{ className: 'voted' }}>
              <FaRegThumbsDown data-rating='up' onClick={handleUserRating} />
            </IconContext.Provider>
            <p>{currentRating?.overall_thumbs_downs || 0}</p>
          </>

        :
        <>
          <p>{currentRating?.overall_thumbs_ups || 0}</p>
          <FaRegThumbsDown data-rating='down' onClick={handleUserRating} />
          <FaRegThumbsUp data-rating='up' onClick={handleUserRating} />
          <p>{currentRating?.overall_thumbs_downs || 0}</p>
        </>
      }
    </>
  )
}