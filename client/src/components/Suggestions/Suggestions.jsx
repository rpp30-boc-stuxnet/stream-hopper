import React, { useState, useEffect } from 'react';
import { MoviesContainer, MoviesTitle, MoviesPoster, MoviesRow } from "../MyMovies/MyMovies.styles.js";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Suggestions({ title, movies }) {

  const [posterIndex, setCarousel] = useState(0);

  const transformLeft = () => {
    setCarousel(posterIndex - 1);
  }


  const transformRight = () => {
    setCarousel(posterIndex + 1);
  }

  let chevronLeftStyle = {
    position: 'absolute',
    display: 'flex',
    marginLeft: '10%',
    alignSelf: 'center'
  };
  let chevronRightStyle = {
    position: 'absolute',
    display: 'flex',
    marginLeft: '80%',
    marginRight: '10%',
    alignSelf: 'center',
    zIndex: '1'
  };

  let transformStyle = { transform: `translateX(-${posterIndex * 200}px)` }
  return (
    <>
      <MoviesContainer>
        <MoviesTitle>{title}</MoviesTitle>
        {posterIndex > 0 && <FaChevronLeft onClick={transformLeft} />}
        <MoviesRow>
          {movies.map((movie) => (
            <MoviesPoster style={transformStyle}
              key={movie.tmdb_id}
              src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
              alt={movie.name}
            />
          ))}
        </MoviesRow>
        {posterIndex < movies.length - 3 && <FaChevronRight onClick={transformRight} />}
      </MoviesContainer>
    </>
  )
}