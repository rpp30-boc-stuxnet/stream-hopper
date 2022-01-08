import React, { useState, useEffect } from 'react';
import './SourceBox.css';
import SourceReview from './SourceReview.js';


function SourceBox(props){


  const [showForm, setShowForm] = useState(false);

  const handleToggle = (e) =>{
    e.preventDefault();
    setShowForm(!showForm);
  }

  return (
    <div className = "sourceBox">
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
      {showForm ? <SourceReview handleToggle = {handleToggle} quality = {props.quality} companyId = {props.companyId}/> : null}
    </div>
  )
}
export default SourceBox;