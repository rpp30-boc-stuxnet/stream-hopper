import React from 'react';
import { MoviesPoster, MoviesRow } from "./MyMovies.styles.js";
// import MyMoviesCard from './MyMoviesCard.jsx';

export default function MyMoviesList({ movies }) {

  return (
    <>
      <MoviesRow movies={movies} >
        {movies.map((movie) => (

          <MoviesPoster
            key={movie.id}
            src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
            alt={movie.name}
          />
        ))}
      </MoviesRow>
    </>
  )

}