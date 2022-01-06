import React, { useState, useEffect } from 'react';
import StreamTile from './StreamTile.js';
import './movieoverview.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieOverview (props) {
  const [existsInMyList, setExistsInMyList] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [titleSources, setTitleSources] = useState({});

  let params = useParams();
  let mediaId = params.id;
  let mediaType = params.type;
  //console.log(mediaType, 'media type');
  const searchDetails = () =>{
    return new Promise((resolve, reject) =>{
      axios.get('/api/titleDetails', {
        params: {
          user_id: window.localStorage.userUID,
          tmdb_id: mediaId,
          type: mediaType
        }
      })
        .then((response) => {
          //console.log('success getting user suggestions: ', response);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
  const searchSources = () =>{
    return new Promise((resolve, reject) =>{
      axios.get('/api/streamSources', {
        params: {
          user_id: window.localStorage.userUID,
          tmdb_id: mediaId,
          type: mediaType
        }
      })
        .then((response) => {
          //console.log('success getting title Sources: ', response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  useEffect(() => {
    let deetz = {};
    let sources = {}
    searchDetails()
    .then((data)=>{
      deetz = data;
      searchSources()
      .then((requestSourcesData)=>{
        sources = requestSourcesData;
        setMovieDetails(deetz);
        setTitleSources(sources);
      })
    })
    .catch((err)=>{
      console.log(err);
    })

  }, [])


  function handleAddMovies (e, movieId) {
    e.preventDefault()
    //make post request - Anna's function to add to movies
  }
  function handleRemoveMovies (e, movieId) {
    e.preventDefault()
    //make post request - Anna's function to add to movies
  }

  return (
    <div id = "movieOverviewContainer">
      <div id = "leftSide">
        <h1 id = "leftSideHeading">{Object.keys(movieDetails).length > 0 ? movieDetails.title : 'Title Missing'}</h1>
        <div id ="moviePoster">
          <img src = { Object.keys(movieDetails).length > 0 ? movieDetails.poster_path : null} alt ="movie_poster"/>
        </div>
        <div id= "movieDetails">
         <div id = "movieRatings">
          { Object.keys(movieDetails).length > 0 ? 'imdb: ' + movieDetails.ratings[0].Value : null}
         </div>
         <div id = "moveReleaseDate">
          { Object.keys(movieDetails).length > 0 ? movieDetails.release_date : null}
         </div>
         <div id = "director">
          { Object.keys(movieDetails).length > 0 ? movieDetails.director : null}
         </div>
         <div id = "runTime">
          { Object.keys(movieDetails).length > 0 ? 'Run Time: ' + movieDetails.run_time : null}
         </div>
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
          <div id ="synopsisContent">
            {Object.keys(movieDetails).length > 0 ? movieDetails.synopsis : 'Synopsis not Available'}
          </div>
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

