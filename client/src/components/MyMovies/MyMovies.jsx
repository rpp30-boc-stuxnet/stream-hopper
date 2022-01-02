import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewButtons from '../ReviewButtons.jsx';
import { MoviesContainer, MoviesTitle, MoviesPoster, MoviesRow, MoviePosterContainer, AddRemoveMovieButton } from "./MyMovies.styles.js";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function MyMovies({ title, movies, getUserMovies, setMovies, removeFromMyMovies, handleUserRating }) {

  const [posterIndex, setCarousel] = useState(0);

  const transformLeft = () => {
    setCarousel(posterIndex - 1);
  }

  const transformRight = () => {
    setCarousel(posterIndex + 1);
  }

  let transformStyle = { transform: `translateX(-${posterIndex * 500}px)` };

  let chevronLeftStyle = {
    display: 'flex',
    alignSelf: 'center',
    zIndex: '1'
  };

  let chevronRightStyle = {
    display: 'flex',
    alignSelf: 'center',
    zIndex: '1'
  };

  return (

    <>
      <MoviesTitle>{title}</MoviesTitle>
      <MoviesContainer>
        {posterIndex > 0 && <FaChevronLeft style={chevronLeftStyle} className="carouselArrow" onClick={transformLeft} />}
        <MoviesRow movies={movies} >

          {movies.map((movie, index) => (
            <MoviePosterContainer style={transformStyle}>
              <Link to={`/movieDetails/${movie.tmdb_id}`}>
                <MoviesPoster
                  key={index}
                  src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
                  alt={movie.name}
                  data-user={movie.user_id}
                  data-id={movie.tmdb_id}
                />
              </Link>
              <div className='buttonsContainer'>
                <AddRemoveMovieButton onClick={removeFromMyMovies}
                  data-user={movie.user_id}
                  data-id={movie.tmdb_id}>Remove</AddRemoveMovieButton>
                <ReviewButtons tmdb_id={movie.tmdb_id} />
              </div>
            </MoviePosterContainer>


          ))}

        </MoviesRow>
        {posterIndex < movies.length - 3 && <FaChevronRight style={chevronRightStyle} onClick={transformRight} />}
      </MoviesContainer>
    </>
  )
}

