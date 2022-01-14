import React, { useState } from 'react';
import ReviewButtons from '../ReviewButtons.jsx';
import AddRemoveButtons from '../AddRemoveButtons.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function SuggestionsList({ title, movies, getUserMovies, setMovies, addToMyMovies, handleUserRating, data_testid }) {

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

  let posterStyle = {
    height: '80%',
    maxHeight: '40vh',
    width: 'auto'
  }

  return (
    <>
      <h1 className='carouselTitle'>{title}</h1>
      <div className='titleListContainer'>
        {posterIndex > 0 && <FaChevronLeft style={chevronLeftStyle} onClick={transformLeft} />}
        <div className="titleRow">
          {movies.map((movie, index) => {

            return <div key={index + 'uniqueSuggestionKey'} className='titlePosterContainer' style={transformStyle}>
              <Link to={`/details/${movie.tmdb_id}/${movie.type}`}>
              <img
                className='titlePoster'
                key={index}
                src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
                alt={movie.name}
                style={posterStyle}
                data-testid={data_testid}
              ></img>
              </Link>
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
        </div>
        {posterIndex < movies.length - 3 && <FaChevronRight style={chevronRightStyle} onClick={transformRight} />}
      </div>
    </>
  )
}