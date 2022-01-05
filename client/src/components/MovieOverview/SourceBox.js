import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SourceBox(props){
  console.log(props.webURL);
  return (
    <div className = "sourceBox">
      <div className ="sourceBoxImageContainer">
        <a href = {props.webURL}>
          <img src = {props.logoURL} className = "sourceBoxImage"/>
        </a>
      </div>
      <div className = "sourceBoxPriceAndQuality">
        {props.price + ' | ' + props.quality}
      </div>
      <div className = "sourceBoxInternalRating">
        Quality: 100%
      </div>
    </div>
  )
}
export default SourceBox;