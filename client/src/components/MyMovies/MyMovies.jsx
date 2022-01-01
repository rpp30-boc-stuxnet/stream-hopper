import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MoviesContainer, MoviesTitle, MoviesPoster, MoviesRow, MoviePosterContainer, RemoveMovieButton, LikeButton, DislikeButton } from "./MyMovies.styles.js";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function MyMovies({ title, movies }) {

  const [posterIndex, setCarousel] = useState(0);

  const transformLeft = () => {
    setCarousel(posterIndex - 1);
  }


  const transformRight = () => {
    setCarousel(posterIndex + 1);
  }

  const removeFromMyMovies = (event) => {
    // let outfitIds = JSON.parse(localStorage.getItem("myOutfit"));
    // let index = outfitIds.data.indexOf(this.props.id);
    // outfitIds.data.splice(index, 1);
    // localStorage.setItem("myOutfit", JSON.stringify(outfitIds));
    // this.props.updateOutfitData(outfitIds);

    // this.setState({
    //   closeClicked: true
    // })
    console.log('this is just the event: ', event.target)
    console.log('this is the event value: ', event.target.value);
    console.log('this is the event name: ', event.target.name);
    // axios.delete('/api/savedTitles', {
    //   params: {
    //     user_id: event.target.name,
    //     tmdb_id: event.target.value
    //   }
    // })
  }

  let transformStyle = { transform: `translateX(-${posterIndex * 500}px)` };

  return (

    <>
      <MoviesContainer>
        <MoviesTitle>{title}</MoviesTitle>
        {posterIndex > 0 && <FaChevronLeft className="carouselArrow" onClick={transformLeft} />}
        <MoviesRow movies={movies} >

          {movies.map((movie, index) => (
            <MoviePosterContainer style={transformStyle}>
              <MoviesPoster onClick={removeFromMyMovies}
                key={movie._id}
                name={movie.user_id}
                src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
                alt={movie.name}
                value={movie.tmdb_id}
              />
              <RemoveMovieButton>Remove</RemoveMovieButton> <LikeButton>{index}</LikeButton>
            </MoviePosterContainer>


          ))}

        </MoviesRow>
        {posterIndex < movies.length - 3 && <FaChevronRight onClick={transformRight} />}
      </MoviesContainer>
    </>
  )
}

