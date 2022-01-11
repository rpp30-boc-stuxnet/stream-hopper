import React from 'react';

export default function AddRemoveButtons({ addToMyMovies, removeFromMyMovies, data_user, data_id, saved_by_user, data_type }) {


  return (
    <>
      {saved_by_user ?
        <button
          className='removeTitleBtn'
          onClick={removeFromMyMovies}
          data-user={data_user}
          data-id={data_id}>Remove</button> :
        <button
          className='addTitleBtn'
          onClick={addToMyMovies}
          data-user={data_user}
          data-id={data_id}
          data-type={data_type}>Add</button>
      }

    </>
  )
}