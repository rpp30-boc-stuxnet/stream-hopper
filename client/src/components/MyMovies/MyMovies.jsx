import React, { useState } from 'react';
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

  let transformStyle = {
    transform: `translateX(-${posterIndex * 500}px)`
  };

  return (

    <>
      <MoviesTitle>{title}</MoviesTitle>
      <MoviesContainer>
        <div className="carouselLeft" >
          {posterIndex > 0 && <FaChevronLeft onClick={transformLeft} />}
        </div>
        <MoviesRow movies={movies} >

          {movies.map((movie, index) => (
            <MoviePosterContainer
              style={transformStyle}
              key={index}>
              <Link to={`/details/${movie.tmdb_id}/${movie.type}`}>
                <MoviesPoster
                  key={index}
                  src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
                  alt={movie.name}
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
        <div className="carouselRight">
          {posterIndex < movies.length - 3 && <FaChevronRight className="carouselRight" onClick={transformRight} />}
        </div>
      </MoviesContainer>
    </>
  )
}

