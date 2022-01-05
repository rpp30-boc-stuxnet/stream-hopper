import React, { useState, useEffect } from 'react';
import SourceBox from './SourceBox.js';
import './StreamTile.css';

function StreamTile (props){

  const[details, setDetails] = useState({})

  useEffect(()=>{
      if(props.details !== undefined) {
        console.log(props, 'stream tile props')
        let validDetails = {};
        validDetails.type = props.type;
        for(let i = 0; i < props.details.length; i++) {
          if(validDetails[props.details[i].companyInfo.name] === undefined) {
            validDetails[props.details[i].companyInfo.name] = {
              price: '',
              quality: '',
              webURL: '',
              logoURL: ''
            }
          }
          if(i === 0) {
            validDetails[props.details[i].companyInfo.name].price = props.details[i].price;
            validDetails[props.details[i].companyInfo.name].quality = props.details[i].quality;
            validDetails[props.details[i].companyInfo.name].webURL = props.details[i].webURL;
            validDetails[props.details[i].companyInfo.name].logoURL = props.details[i].companyInfo.logo_100px;
          } else {
            if(props.details[i].quality === '4K') {

              validDetails[props.details[i].companyInfo.name].price = props.details[i].price;
              validDetails[props.details[i].companyInfo.name].quality = '4K';
              validDetails[props.details[i].companyInfo.name].webURL = props.details[i].webURL;
              validDetails[props.details[i].companyInfo.name].logoURL = props.details[i].companyInfo.logo_100px;
            } else if (props.details[i].quality === 'HD' && validDetails[props.details[i].companyInfo.name].quality !== '4K') {
              validDetails[props.details[i].companyInfo.name].price = props.details[i].price;
              validDetails[props.details[i].companyInfo.name].quality = 'HD';
              validDetails[props.details[i].companyInfo.name].webURL = props.details[i].webURL;
              validDetails[props.details[i].companyInfo.name].logoURL = props.details[i].companyInfo.logo_100px;
            } else if(props.details[i].quality === 'SD' &&
            (validDetails[props.details[i].companyInfo.name].quality !== '4k' || validDetails[props.details[i].companyInfo.name].quality !== 'HD')) {
              validDetails[props.details[i].companyInfo.name].price = props.details[i].price;
              validDetails[props.details[i].companyInfo.name].quality = 'SD';
              validDetails[props.details[i].companyInfo.name].webURL = props.details[i].webURL;
              validDetails[props.details[i].companyInfo.name].logoURL = props.details[i].companyInfo.logo_100px;
            }
          }

        }
      console.log(validDetails, 'validDetails')
      setDetails(validDetails);
    }

  }, [])



  return(
    <div className = "tileContainer">
      <div className = "typeName">{details.type ? details.type: 'Not Available'}</div>
      <div className = "sourceContainer">
        {Object.keys(details).length > 0 ?
          Object.keys(details).map((item, index)=>{
            return (
              <SourceBox price = {details[item].price} quality = {details[item].quality} webURL = {details[item].webURL} logoURL = {details[item].logoURL} key = {index}/>
            )
          })
        : null}
      </div>
    </div>
  )
}

export default StreamTile;