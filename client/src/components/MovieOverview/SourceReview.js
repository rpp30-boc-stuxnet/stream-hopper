import React, { useState, useEffect } from 'react';
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

  const handleAudioRating = (rate) => {

    setAudioRating(Number(rate));
  }

  const handleVideoRating = (rate) => {

    setVideoRating(Number(rate));
  }

  const handleReliabilityRating = (rate) => {

    setReliabilityRating(Number(rate));
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
      let qualityCheck = props.quality;
      if(qualityCheck === null) {
        qualityCheck = "SD";
      }
      let options = {
        user_id: window.localStorage.userUID,
          tmdb_id: mediaId,
          title_type: mediaType,
          source_company_id: props.companyId,
          stream_format: qualityCheck,
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
    <div className="formContainer">
      <div className="formBackground">
      <div className="reviewExit" onClick={props.handleToggle}>X</div>
        <div className="formHeader">
          <div className="statement">
           {canSubmit.showFeedback ? null : 'Rate your Experience Watching ' + props.titleName + ' on ' + props.companyName}
          </div>
        </div>
        {canSubmit.showFeedback ? (

          <div className="confirmationMessage">
            Ratings Received!
          </div>

          ) :
          <>
          <form onSubmit = {handleSubmit} className="formContent">
            <label>
              Audio Quality:
              <div className="reviewStars">
                <Rating name = "audio"
                        onChange = {(event, newValue) => {handleAudioRating(newValue)}}
                        value = {audioRating} />
              </div>
              <br></br>
            </label>
            <label>
              Video Quality:
              <div className="reviewStars">
              <Rating name = "video"
                        onChange = {(event, newValue) => {handleVideoRating(newValue)}}
                        value = {videoRating} />
              </div>
              <br></br>
            </label>
            <label>
              Reliability:
              <div className="reviewStars">
              <Rating name = "reliability"
                        onChange = {(event, newValue) => {handleReliabilityRating(newValue)}}
                        value = {reliabilityRating} />
              </div>
              <br></br>
            </label>
            <button type ="submit" value="Submit" className="reviewSubmitBtn">Submit</button>
          </form>
          {canSubmit.errorMessage === '' ? null : canSubmit.errorMessage}
          </>

        }

      </div>
    </div>
  )
}


export default SourceReview;