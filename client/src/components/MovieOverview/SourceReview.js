import React, { useState, useEffect } from 'react';
import './SourceReview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SourceReview(props){

  let params = useParams();
  let mediaId = params.id;
  let mediaType = params.type;


  const [sourceReviewData, setSourceReviewData] = useState({
    user_audio_quality_rating: '',
    user_video_quality_rating: '',
    user_stream_reliability_rating: ''
  });

  const handleSubmit = (e) =>{
    e.preventDefault();
    // console.log(sourceReviewData);
    let options = {
      user_id: window.localStorage.userUID,
        tmdb_id: mediaId,
        stream_type: mediaType,
        source_company_id: props.companyId,
        stream_format: props.quality,
        user_audio_quality_rating: sourceReviewData.user_audio_quality_rating,
        user_stream_reliability_rating: sourceReviewData.user_stream_reliability_rating,
        user_video_quality_rating: sourceReviewData.user_video_quality_rating
    };
    console.log(options, 'query options')
    axios.post('/api/streamRatings', options)
      .then((response) => {
        //console.log('success getting user suggestions: ', response);
        console.log(response.data);
        props.handleToggle(e);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  const handleFormChange = (e) =>{
    let newData = sourceReviewData;

    if(e.target.name === 'audioQuality') {
      newData.user_audio_quality_rating = e.target.value;
    }
    if(e.target.name === 'videoQuality') {
      newData.user_video_quality_rating = e.target.value;
    }
    if(e.target.name === 'reliabilityRating') {
      newData.user_stream_reliability_rating = e.target.value;
    }
    setSourceReviewData(newData);
  }
  return (
    <div id = "formContainer">
      <div id = "formBackground">
        <div id = "formHeader" onClick = {props.handleToggle}>
          X
        </div>
        <form onSubmit = {handleSubmit}>
        <label>
          Audio Quality:
          <input type = "text" className = "formInputField" name = "audioQuality" onChange = {handleFormChange}/>
          <br></br>
        </label>
        <label>
          Video Quality:
          <input type = "text" className = "formInputField" name = "videoQuality" onChange = {handleFormChange}/>
          <br></br>
        </label>
        <label>
          Reliability:
          <input type = "text" className = "formInputField" name = "reliabilityRating" onChange = {handleFormChange}/>
          <br></br>
        </label>
        <button type ="submit" value="Submit" id = "reviewSubmission">Submit</button>
        </form>
      </div>
    </div>
  )
}
export default SourceReview;