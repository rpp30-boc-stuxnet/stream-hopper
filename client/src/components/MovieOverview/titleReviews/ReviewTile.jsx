import React from 'react';

const ReviewTile = (props) => {
  return(
    <div>
      <span>{props.username}</span>
      <span>{props.time}</span>
      <span>{props.reviewBody}</span>
    </div>
  ) ;
}

export default ReviewTile;
