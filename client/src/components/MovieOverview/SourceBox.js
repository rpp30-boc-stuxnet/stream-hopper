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
  const [streamHopperQuality, setStreamHopperQuality] = useState(undefined);

  const handleToggle = (e) =>{
    e.preventDefault();
    setShowForm(!showForm);
  }
  // useEffect(()=>{
  //   let options = {
  //     user_id: window.localStorage.userUID,
  //       tmdb_id: mediaId,
  //       source_company_id: props.companyId,
  //       stream_type: mediaType,
  //       stream_format: props.quality
  //   }
  //   console.log(options, 'options')
  //   axios.get('/api/streamSources', {params: options})
  //   .then((response)=>{
  //     console.log(response, 'getStreamQuality')
  //   })
  //   .catch((error)=>{
  //     return error
  //   })
  // }, [])

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
      {(props.price && props.quality) ? '100%' : 'Quality Not Available'}
      </div>
      {showForm ? <SourceReview handleToggle = {handleToggle} quality = {props.quality} companyId = {props.companyId}
      titleName = {props.titleName} companyName = {props.companyName}/> : null}
    </div>
  )
}
export default SourceBox;