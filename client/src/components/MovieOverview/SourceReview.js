import React, { useState, useEffect } from 'react';
import './SourceReview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '@mui/material/Rating';

function SourceReview(props){

  let params = useParams();
  let mediaId = params.id;
  let mediaType = params.type;

  const [audioRating, setAudioRating] = useState(0);
  const [videoRating, setVideoRating] = useState(0);
  const [reliabilityRating, setReliabilityRating] = useState(0);


  const [canSubmit, setCanSubmit] = useState ({
    fieldsFilled: false,
    errorMessage: '',
    confirmationMessage: 'Ratings Received!',
    showFeedback: false
  })

  const handleAudioRating = (rate: number) => {

    setAudioRating(rate);
  }

  const handleVideoRating = (rate: number) => {

    setVideoRating(rate);
  }

  const handleReliabilityRating = (rate: number) => {

    setReliabilityRating(rate);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(audioRating === '' || audioRating === null || audioRating === 0) {
      setCanSubmit({errorMessage: 'Fill out Audio Rating'})
    } else if(videoRating === '' || videoRating === null || videoRating === 0) {
      setCanSubmit({errorMessage: 'Fill out Video Rating'})
    } else if(reliabilityRating === '' || reliabilityRating === null || reliabilityRating === 0) {
      setCanSubmit({errorMessage: 'Fill out Reliability Rating'})
    } else {
      let options = {
        user_id: window.localStorage.userUID,
          tmdb_id: mediaId,
          title_type: mediaType,
          source_company_id: props.companyId,
          stream_format: props.quality,
          stream_type: props.streamType,
          user_audio_quality_rating: audioRating,
          user_stream_reliability_rating: reliabilityRating,
          user_video_quality_rating: videoRating
      };

      axios.post('/api/streamRatings', options)
        .then((response) => {
          console.log('success saving rating');
          setCanSubmit({errorMessage: '', showFeedback: true})
        })
        .catch((error) => {
          console.log(error);
        })
    }

  }

  return (
    <div id = "formContainer">
      <div id = "formBackground">
      <div id = "exit" onClick = {props.handleToggle}>X</div>
        <div id = "formHeader">
          <div id = "statement">
           {canSubmit.showFeedback ? null : 'Rate your Experience Watching ' + props.titleName + ' on ' + props.companyName}
          </div>
        </div>
        {canSubmit.showFeedback ? (

          <div id = "confirmationMessage">
            Ratings Received!
          </div>

          ) :
          <>
          <form onSubmit = {handleSubmit} id = "formContent">
            <label>
              Audio Quality:
              <div className ="stars">
                <Rating name = "audio"
                        onChange = {(event, newValue) => {handleAudioRating(newValue)}}
                        value = {audioRating} />
              </div>
              <br></br>
            </label>
            <label>
              Video Quality:
              <div className ="stars">
              <Rating name = "video"
                        onChange = {(event, newValue) => {handleVideoRating(newValue)}}
                        value = {videoRating} />
              </div>
              <br></br>
            </label>
            <label>
              Reliability:
              <div className ="stars">
              <Rating name = "reliability"
                        onChange = {(event, newValue) => {handleReliabilityRating(newValue)}}
                        value = {reliabilityRating} />
              </div>
              <br></br>
            </label>
            <button type ="submit" value="Submit" id = "reviewSubmission">Submit</button>
          </form>
          {canSubmit.errorMessage === '' ? null : canSubmit.errorMessage}
          </>

        }

      </div>
    </div>
  )
}


export default SourceReview;