import React, { useState, useEffect } from 'react';
import './SourceBox.css';

function SourceBox(props){
  return (
    <div className = "sourceBox">
      <div className ="sourceBoxImageContainer">
        {props.logoURL ?
        <a href = {props.webURL}>
          <img src = {props.logoURL} className = "sourceBoxImage"/>
        </a> : <img src = "https://i.imgur.com/7sR45d6.png" className = "sourceBoxImage"/>}
      </div>
      <div className = "sourceBoxPriceAndQuality">
        {(props.price && props.quality) ? (props.price + ' | ' + props.quality) : 'Info Not Available'}
      </div>
      <div className = "sourceBoxInternalRating">
      {(props.price && props.quality) ? '100%' : 'Quality Not Available'}
      </div>
    </div>
  )
}
export default SourceBox;