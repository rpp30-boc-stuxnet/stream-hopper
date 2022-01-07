import React from 'react';

const ReviewTile = (props) => {

  const translateDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = date.slice(8, 10)
    const year = date.slice(0, 4)
    const month = months[parseInt(date.slice(5, 7)) - 1]
    const returnDate = month + ' ' + day + ', ' + year

    return returnDate
  }

  return(
    <div className="reviewTile">
      <div className="reviewUserDate">
        <span>{props.username}</span>
        <span>{translateDate(props.time)}</span>
      </div>
      <div className="reviewBody">
        <span>{props.reviewBody}</span>
      </div>
    </div>
  ) ;
}

export default ReviewTile;
