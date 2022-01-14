import React, { useState, useEffect } from 'react';
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
    getRatings();
  }, [])

  const getRatings = () =>{

    let qualityCheck = props.quality;
    let rentBuySubFree = props.streamType;
    if(qualityCheck === null) {
      qualityCheck = "SD"
    }
    if(rentBuySubFree === "tve" || rentBuySubFree === "TVE") {
      rentBuySubFree = "free"
    }
    axios.get('/api/streamRatings', {
      params: {
        user_id: window.localStorage.userUID,
        tmdb_id: Number(mediaId),
        source_company_id: props.companyId,
        stream_type: rentBuySubFree,
        stream_format: qualityCheck,
        title_type: mediaType
      }
    })
    .then((response)=>{

      setStreamHopperQuality(  response.data  );
    })
    .catch((error)=>{

      return error
    })

  }

  return (
    <div className = "sourceBox ">
      <div className ="sourceBoxImageContainer">
        {props.logoURL ?
          <img src = {props.logoURL} className = "sourceBoxImage" onClick = {handleToggle}/>
          : <img src = "https://i.imgur.com/7sR45d6.png" className = "sourceBoxImage"/>}
      </div>
      {props.streamType === "buy" ? <div className = "sourceBoxPriceAndQuality">
        {(props.price && props.quality) ? (props.price + ' | ' + props.quality) : 'Info Not Available'}
      </div> : null}
      <div className = "sourceBoxInternalRating">
        <div className = "audioRating">
          {streamHopperQuality.audio_average_rating !== undefined  && streamHopperQuality.audio_average_rating !== null ? ('Audio: ' + streamHopperQuality.audio_average_rating + '/5') : 'Audio: Not yet rated'}
        </div>
        <div className = "videoRating">
          {streamHopperQuality.video_average_rating !== undefined && streamHopperQuality.video_average_rating !== null? ('Video: ' + streamHopperQuality.video_average_rating + '/5') : 'Video: Not yet rated' }
        </div>
        <div className = "reliabilityRating">
          {streamHopperQuality.reliability_average_rating !== undefined && streamHopperQuality.reliability_average_rating !== null? ('Reliability: ' + streamHopperQuality.reliability_average_rating + '/5') : 'Reliability: Not yet rated'}
        </div>
      </div>
      {showForm ? <SourceReview handleToggle = {handleToggle} quality = {props.quality} companyId = {props.companyId}
      titleName = {props.titleName} companyName = {props.companyName} streamType = {props.streamType} refreshData = {getRatings}/> : null}
    </div>
  )
}
export default SourceBox;