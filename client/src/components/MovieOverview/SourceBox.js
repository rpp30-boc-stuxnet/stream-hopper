import React, { useState, useEffect } from 'react';
import './SourceBox.css';
import SourceReview from './SourceReview.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SourceBox(props){

  let params = useParams();
  let mediaId = params.id;
  let mediaType = params.type;

  const [showForm, setShowForm] = useState(false);
  const [streamHopperQuality, setStreamHopperQuality] = useState({});

  const handleToggle = (e) =>{
    e.preventDefault();
    setShowForm(!showForm);
  }
  useEffect(()=>{

    axios.get('/api/streamRatings', {
      params: {
        user_id: window.localStorage.userUID,
        tmdb_id: Number(mediaId),
        source_company_id: props.companyId,
        stream_type: props.streamType,
        stream_format: props.quality,
        title_type: mediaType
      }
    })
    .then((response)=>{

      setStreamHopperQuality(response.data);
    })
    .catch((error)=>{

      return error
    })
  }, [])


  return (
    <div className = "sourceBox ">
      <div className ="sourceBoxImageContainer">
        {props.logoURL ?
          <img src = {props.logoURL} className = "sourceBoxImage" onClick = {handleToggle}/>
          : <img src = "https://i.imgur.com/7sR45d6.png" className = "sourceBoxImage"/>}
      </div>
      <div className = "sourceBoxPriceAndQuality">
        {(props.price && props.quality) ? (props.price + ' | ' + props.quality) : 'Info Not Available'}
      </div>
      <div className = "sourceBoxInternalRating">
        <div className = "audioRating">
          {streamHopperQuality.audio_average_rating ? ('Audio: ' + streamHopperQuality.audio_average_rating) : 'Audio: Not yet rated'}
        </div>
        <div className = "videoRating">
          {streamHopperQuality.video_average_rating ? ('Video: ' + streamHopperQuality.video_average_rating) : 'Video: Not yet rated' }
        </div>
        <div className = "reliabilityRating">
          {streamHopperQuality.reliability_average_rating ? ('Reliability: ' + streamHopperQuality.reliability_average_rating) : 'Reliability: Not yet rated'}
        </div>
      </div>
      {showForm ? <SourceReview handleToggle = {handleToggle} quality = {props.quality} companyId = {props.companyId}
      titleName = {props.titleName} companyName = {props.companyName} streamType = {props.streamType}/> : null}
    </div>
  )
}
export default SourceBox;