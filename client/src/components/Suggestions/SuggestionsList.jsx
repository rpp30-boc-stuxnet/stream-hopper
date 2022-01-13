import React, { useState } from 'react';
import ReviewButtons from '../ReviewButtons.jsx';
import AddRemoveButtons from '../AddRemoveButtons.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export default function SuggestionsList({ title, movies, getUserMovies, setMovies, addToMyMovies, handleUserRating }) {

  const [posterIndex, setCarousel] = useState(0);

  const transformLeft = () => {
    setCarousel(posterIndex - 1);
  }

  const transformRight = () => {
    setCarousel(posterIndex + 1);
  }

  let transformStyle = {
    transform: `translateX(-${posterIndex * 500}px)`
  };

  let chevronLeftStyle = {
    cursor: 'pointer',
    display: 'flex',
    alignSelf: 'center',
    zIndex: '1'
  };

  let chevronRightStyle = {
    cursor: 'pointer',
    display: 'flex',
    alignSelf: 'center',
    zIndex: '1'
  };

  return (
    <>
      <h1 className='carouselTitle'>{title}</h1>
      <div className='titleListContainer' style={transformStyle}>
        {posterIndex > 0 && <FaChevronLeft style={chevronLeftStyle} onClick={transformLeft} />}

        {movies.map((movie, index) => {

          return <div className='titlePosterContainer'>
            <img
              key={index}
              src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
              alt={movie.name}
            ></img>
            <div className='buttonsContainer'>
              <AddRemoveButtons
                addToMyMovies={addToMyMovies}
                saved_by_user={movie.saved_by_user}
                data_user={movie.user_id}
                data_id={movie.tmdb_id}
                data_type={movie.type} />
              <ReviewButtons tmdb_id={movie.tmdb_id} />
            </div>
          </div>
        })
        }
        {posterIndex < movies.length - 3 && <FaChevronRight style={chevronRightStyle} onClick={transformRight} />}
      </div>
    </>
  )
}