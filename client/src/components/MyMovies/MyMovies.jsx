import React, { useState } from 'react';
import { MoviesContainer, MoviesTitle, MoviesPoster, MoviesRow } from "./MyMovies.styles.js";
export default function MyMovies({ title, movies }) {



  return (
    <>
      <MoviesContainer>
        <MoviesTitle>{title}</MoviesTitle>
        <MoviesRow>
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