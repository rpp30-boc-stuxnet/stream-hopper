import React from 'react';
import { MoviesContainer, MoviesTitle, MoviesPoster, MoviesRow } from "./MyMovies.styles.js";
// import MyMoviesList from './MyMoviesList.jsx';
export default function MyMovies({ title, movies }) {



  return (
    <>
      <MoviesContainer>
        <MoviesTitle>{title}</MoviesTitle>
        {/* <MyMoviesList movies={movies} /> */}
        <MoviesRow movies={movies} >
          {movies.map((movie) => (
            <MoviesPoster
              key={movie.id}
              src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
              alt={movie.name}
            />
          ))}
        </MoviesRow>
      </MoviesContainer>
    </>
  )
}