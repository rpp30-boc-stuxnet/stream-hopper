import React, { useState, useEffect } from 'react';
import { MoviesContainer, MoviesTitle, MoviesPoster, MoviesRow, MoviePosterContainer, AddRemoveMovieButton } from "../MyMovies/MyMovies.styles.js";
import ReviewButtons from '../ReviewButtons.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Suggestions({ title, movies, addToMyMovies }) {

  const [suggestionsPosterIndex, setSuggestionsCarousel] = useState(0);

  const transformLeft = () => {
    setSuggestionsCarousel(suggestionsPosterIndex - 1);
  }


  const transformRight = () => {
    setSuggestionsCarousel(suggestionsPosterIndex + 1);
  }

  let chevronLeftStyle = {
    display: 'flex',
    alignSelf: 'center'
  };

  let chevronRightStyle = {
    display: 'flex',
    alignSelf: 'center',
    zIndex: '1'
  };

  let transformStyle = { transform: `translateX(-${suggestionsPosterIndex * 350}px)` }

  return (
    <>
      <MoviesTitle>{title}</MoviesTitle>
      <MoviesContainer>
        {suggestionsPosterIndex > 0 && <FaChevronLeft style={chevronLeftStyle} className="carouselArrow" onClick={transformLeft} />}
        <MoviesRow>
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
                <AddRemoveMovieButton onClick={addToMyMovies}
                  data-user={movie.user_id}
                  data-id={movie.tmdb_id}
                  data-type={movie.type}>Add</AddRemoveMovieButton>
                <ReviewButtons tmdb_id={movie.tmdb_id} />
              </div>
            </MoviePosterContainer>
          ))}
        </MoviesRow>
        {suggestionsPosterIndex < movies.length - 4 && <FaChevronRight style={chevronRightStyle} onClick={transformRight} />}
      </MoviesContainer>
    </>
  )
}