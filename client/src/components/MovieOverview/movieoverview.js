import React, { useState } from 'react';
import StreamTile from './StreamTile.js';
import './movieoverview.css';

function MovieOverview (props) {
  //props hands me userId and movieId
  //const userId = props.userId;
  //const movieId = props.movieId;  << might be named something else


  function handleAddMovies (e, movieId) {
    e.preventDefault()
    //make post request
  }
  console.log(props, 'props passed into MovieOverview');

  return (
    <div id = "movieOverviewContainer">
      <div id = "leftSide">
        <h1 id = "leftSideHeading">Movie Title</h1>
        <div id ="moviePoster">
          <img src = {"https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_FMjpg_UX1000_.jpg"}/>
        </div>
        <div id= "movieDetails">
         {/* may need to make a separate call*/}
        </div>
        <button id ="addMovie" onClick = {handleAddMovies}> Add to My Movies </button>
      </div>
      <div id = "rightSide">
        <h2 id ="rightSideHeading"> Where to Watch</h2>
        {/* <StreamTile title = {"Stream"} options = {options.stream ? options.stream : null}/>
        <StreamTile title = {"Rent"} options = {options.rent ? options.rent : null}/>
        <StreamTile title = {"Buy"} options = {options.buy ? options.buy : null}/> */}
        <div>
          <h3 id ="synopsisHeading">Film Synopsis</h3>
          <textarea id ="synopsisContent">
            sdfnasodfnasodf {/* may need to use react hook state for content*/}
          </textarea>
        </div>
      </div>

    </div>
  )

}

export default MovieOverview;

//list of props needed for component to work.
//stream sources (hulu, amazon, netflix etc.)
//film synopsis (description)
//movie title
// move poster url
// needs to check if movie is part of "My Movies"
// year, released, run time, rotten tomato score rating, stream hopper rating

