import React, { useState, useEffect } from 'react';
import StreamTile from './StreamTile.js';
import TitleReviews from './titleReviews/TitleReviews.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ReviewButtons from '../ReviewButtons.jsx';
import AddRemoveButtons from '../AddRemoveButtons.jsx';

function MovieOverview (props) {
  const [movieDetails, setMovieDetails] = useState({});
  const [titleSources, setTitleSources] = useState({});
  const [quickToggle, setQuickToggle] = useState(0);

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
    // console.log(mappedData)
     return mappedData;
  }

  useEffect(() => {
    loadDetails();

  }, [])

  const loadDetails = () =>{
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
        setQuickToggle(data.saved_by_user);
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  const removeFromMyMovies = (event) => {
    axios.delete('/api/savedTitles', {
      data: {
        user_id: event.target.dataset.user,
        tmdb_id: parseInt(event.target.dataset.id)
      }
    })
      .then(() => {
        setQuickToggle(-1);

      })
      .catch((error) => {
        console.log('error getting user movies: ', error);
      })
  }

  const addToMyMovies = (event) => {
    axios.post('/api/savedTitles', {
      user_id: window.localStorage.userUID,
      type: event.target.dataset.type,
      tmdb_id: parseInt(event.target.dataset.id)
    })
      .then(() => {
        setQuickToggle(1);
      })
      .catch((error) => {
        console.log('error adding title to my movies: ', error);
      })
  }

  return (
    <>

    <div className="titleOverviewContainer">
      <div className="detailContainer">
        <div className="detailFader"></div>
        <h1 className="title">{Object.keys(movieDetails).length > 0 ? movieDetails.title : 'Title Missing'}</h1>
        <div className="overviewPoster">
          <img src = { Object.keys(movieDetails).length > 0 ? movieDetails.poster_path : 'https://i.imgur.com/7sR45d6.png'} alt ="movie_poster"/>
        </div>
        <div className="btnContainer">
          <div className="addRemoveButtonsOverview">
          <AddRemoveButtons
                    addToMyMovies={addToMyMovies}
                    removeFromMyMovies={removeFromMyMovies}
                    saved_by_user={quickToggle === 1 ? true : (quickToggle === -1 ? false : movieDetails.saved_by_user)}
                    data_user={window.localStorage.userUID}
                    data_id={mediaId}
                    data_type={mediaType} />
          </div>
          <ReviewButtons tmdb_id={mediaId} />
        </div>
        <div className="titleDetails">
         <div id = "movieRatings">
          { Object.keys(movieDetails).length > 0  && Object.keys(movieDetails.ratings).length > 0 ? 'imdb: ' + movieDetails.ratings[0].Value : null}
         </div>
         <div id = "moveReleaseDate">
          { Object.keys(movieDetails).length > 0 ? ('Release: ' + movieDetails.release_date) : 'Release: N/A'}
         </div>
         <div id = "director">
          { Object.keys(movieDetails).length > 0 ? ('Director: ' + movieDetails.director) : 'Director: N/A--'}
         </div>
         <div id = "runTime">
          { Object.keys(movieDetails).length > 0 ? 'Run Time: ' + movieDetails.run_time : 'Run Time: N/A'}
         </div>
        </div>
      </div>
      <div className="streamOptions">
        <h2 className="streamOptionsHeading">Where to Watch</h2>
        <div className="streamOptionsContainer">
          {Object.keys(titleSources).length > 0 ? Object.keys(titleSources).map((item, index) => {
            return <StreamTile type = {item} key = {index} details = {titleSources[item]} titleName = {movieDetails.title}/>
          }): <StreamTile type = 'Not Available'/>}
        </div>
        <div className="synopsisContainer">
          <h3 className="synopsisHeading">Title Synopsis</h3>
          <div className="overviewSynopsis">
            {Object.keys(movieDetails).length > 0 ? movieDetails.synopsis : 'Synopsis not Available'}
          </div>
        </div>
        <div className="titleReviewsHolder">
          <TitleReviews title={Object.keys(movieDetails).length > 0 ? movieDetails.title : 'No title'} tmdb_id={Object.keys(movieDetails).length > 0 ? movieDetails.tmdb_id : null} type={mediaType}/>
        </div>
      </div>

    </div>
    </>
  )

}

export default MovieOverview;

