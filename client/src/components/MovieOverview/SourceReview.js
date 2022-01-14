import React, { useState, useEffect } from 'react';
// import './SourceReview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";

function SourceReview(props) {

  let params = useParams();
  let mediaId = params.id;
  let mediaType = params.type;


  const [sourceReviewData, setSourceReviewData] = useState({
    user_audio_quality_rating: '',
    user_video_quality_rating: '',
    user_stream_reliability_rating: ''
  });
  const [canSubmit, setCanSubmit] = useState({
    fieldsFilled: false,
    errorMessage: '',
    confirmationMessage: 'Ratings Received!',
    showFeedback: false
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(sourceReviewData);
    console.log(sourceReviewData);
    if (sourceReviewData.user_audio_quality_rating === '' || sourceReviewData.user_audio_quality_rating === null) {
      setCanSubmit({ errorMessage: 'Fill out Audio Rating' })
    } else if (sourceReviewData.user_video_quality_rating === '' || sourceReviewData.user_video_quality_rating === null) {
      setCanSubmit({ errorMessage: 'Fill out Video Rating' })
    } else if (sourceReviewData.user_stream_reliability_rating === '' || sourceReviewData.user_stream_reliability_rating === null) {
      setCanSubmit({ errorMessage: 'Fill out Reliability Rating' })
    } else {
      let options = {
        user_id: window.localStorage.userUID,
        tmdb_id: mediaId,
        title_type: mediaType,
        source_company_id: props.companyId,
        stream_format: props.quality,
        stream_type: props.streamType,
        user_audio_quality_rating: sourceReviewData.user_audio_quality_rating,
        user_stream_reliability_rating: sourceReviewData.user_stream_reliability_rating,
        user_video_quality_rating: sourceReviewData.user_video_quality_rating
      };

      axios.post('/api/streamRatings', options)
        .then((response) => {
          console.log('success saving rating: ', response);
          setCanSubmit({ errorMessage: '', showFeedback: true })
        })
        .catch((error) => {
          console.log(error);
        })
    }

  }

  const handleFormChange = (e, m) => {
    console.log(e + m, ' handleformchange')
    let newData = sourceReviewData;
    if (m === 'audio') {
      newData.user_audio_quality_rating = e;
    }
    if (m === 'video') {
      newData.user_video_quality_rating = e;
    }
    if (m === 'reliability') {
      newData.user_stream_reliability_rating = e;
    }
    setSourceReviewData(newData);
  }
  return (
    <div id="formContainer">
      <div id="formBackground">
        <div id="formHeader">
          <div id="statement">
            {canSubmit.showFeedback ? null : 'Rate your Experience Watching ' + props.titleName + ' on ' + props.companyName}
          </div>
          <div id="exit" onClick={props.handleToggle}>X</div>
        </div>
        {canSubmit.showFeedback ? (

          <div id="confirmationMessage">
            Ratings Received!
          </div>

        ) :
          <>
            <form onSubmit={handleSubmit}>
              <label>
                Audio Quality:
              <div className="stars">
                  <ReactStars count={5} onChange={(e) => {
                    handleFormChange(e, 'audio');
                  }} size={25} activeColor={'#ffd700'} />
                </div>
                <br></br>
              </label>
              <label>
                Video Quality:
              <div className="stars">
                  <ReactStars count={5} onChange={(e) => {
                    handleFormChange(e, 'video');
                  }} size={25} activeColor={'#ffd700'} />
                </div>
                <br></br>
              </label>
              <label>
                Reliability:
              <div className="stars">
                  <ReactStars count={5} onChange={(e) => {
                    handleFormChange(e, 'reliability');
                  }} size={25} activeColor={'#ffd700'} />
                </div>
                <br></br>
              </label>
              <button type="submit" value="Submit" id="reviewSubmission">Submit</button>
            </form>
            {canSubmit.errorMessage === '' ? null : canSubmit.errorMessage}
          </>

        }

      </div>
    </div>
  )
}
export default SourceReview;