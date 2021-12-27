import React from 'react';
import { MoviesContainer, MoviesTitle, MoviesPoster, MoviesRow } from "../MyMovies/MyMovies.styles.js";
export default function Suggestions({ title, movies }) {
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