import React, { useState } from 'react';
import ReviewButtons from '../ReviewButtons.jsx';
import { MoviesContainer, MoviesTitle, MoviesPoster, MoviesRow, MoviePosterContainer, AddRemoveMovieButton } from "../MyMovies/MyMovies.styles.js";
import AddRemoveButtons from '../AddRemoveButtons.jsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NowTrending({ title, trendingTitles, addToMyMovies }) {

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
      <>
        <MoviesTitle>{title}</MoviesTitle>
        <MoviesContainer>
          {posterIndex > 0 && <FaChevronLeft style={chevronLeftStyle} className="carouselArrow" onClick={transformLeft} />}
          <MoviesRow trendingTitles={trendingTitles} >

            {trendingTitles.map((movie, index) => (
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
                  <AddRemoveButtons
                    addToMyMovies={addToMyMovies}
                    data_id={movie.tmdb_id}
                    data_type={movie.type} />
                  <ReviewButtons tmdb_id={movie.tmdb_id} />
                </div>
              </MoviePosterContainer>


            ))}

          </MoviesRow>
          {posterIndex < trendingTitles.length - 3 && <FaChevronRight style={chevronRightStyle} onClick={transformRight} />}
        </MoviesContainer>
      </>
    </>
  )
}