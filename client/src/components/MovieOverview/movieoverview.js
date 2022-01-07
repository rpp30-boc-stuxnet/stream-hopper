import React, { useState, useEffect } from 'react';
import StreamTile from './StreamTile.js';
import './movieoverview.css';
import TitleReviews from './titleReviews/TitleReviews.jsx';
import axios from 'axios';
import './titleReviews/titleReviews.css';
import { useParams } from 'react-router-dom';

function MovieOverview (props) {
  const [movieDetails, setMovieDetails] = useState({});
  const [titleSources, setTitleSources] = useState({});

  let params = useParams();
  let mediaId = params.id;
  let mediaType = params.type;

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
  const transformDataSources = (data) => {
    let mappedData = {};
    for(let i = 0; i < data.length; i++) {
      if(mappedData[data[i].type] === undefined) {
        mappedData[data[i].type] = [];
      }
      mappedData[data[i].type].push({
        companyInfo: data[i].company_info,
        price: data[i].price,
        quality: data[i].format,
        webUrl: data[i].web_url,
        type: data[i].type
      })
    }
    console.log(mappedData)
     return mappedData;
  }

  useEffect(() => {
    let deetz = {};
    let sources = {};
    searchDetails()
    .then((data)=>{
      deetz = data;
      searchSources()
      .then((requestSourcesData)=>{
        sources = requestSourcesData;
        setMovieDetails(deetz);

        let tranformedData = transformDataSources(sources);
        setTitleSources(tranformedData);
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
          <img src = { Object.keys(movieDetails).length > 0 ? movieDetails.poster_path : 'https://i.imgur.com/7sR45d6.png'} alt ="movie_poster"/>
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
        <div id ="addRemoveMovieButtons">
          {Object.keys(movieDetails).length > 0 ?
            (movieDetails.saved_by_user ? <button id ="addMovie" onClick = {handleAddMovies}> Add to My Movies </button> : <button id ="addMovie" onClick = {handleRemoveMovies}> Remove from My Movies </button>) :
            null}
        </div>
      </div>
      <div id = "streamOptions">
        <h2 id ="streamOptionsHeading"> Where to Watch</h2>
        <div id= "streamOptionsContainer">
          {Object.keys(titleSources).length > 0 ? Object.keys(titleSources).map((item, index) => {
            return <StreamTile type = {item} key = {index} details = {titleSources[item]}/>
          }): <StreamTile type = 'Not Available'/>}
        </div>
        <div>
          <h3 id ="synopsisHeading">Film Synopsis</h3>
          <div id ="synopsisContent">
            {Object.keys(movieDetails).length > 0 ? movieDetails.synopsis : 'Synopsis not Available'}
          </div>
        </div>
        <div className="titleReviewsHolder">
          <TitleReviews title={Object.keys(movieDetails).length > 0 ? movieDetails.title : 'No title'} tmdb_id={Object.keys(movieDetails).length > 0 ? movieDetails.tmdb_id : null} type={mediaType}/>
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

