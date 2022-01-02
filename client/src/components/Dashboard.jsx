import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyMovies from './MyMovies/MyMovies.jsx';
import Suggestions from './Suggestions/Suggestions.jsx';
import Navbar from './Navbar/Navbar.jsx';

export default function Dashboard(props) {

  const [userMovies, setMovies] = useState(null);
  const [userSuggestions, setSuggestions] = useState(null);

  const getUserMovies = () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/savedTitles', {
        params: {
          user_id: window.localStorage.userUID
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  const getUserSuggestions = () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/relatedTitles', {
        params: {
          user_id: window.localStorage.userUID
        }
      })
        .then((response) => {
          //console.log('success getting user suggestions: ', response);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  const removeFromMyMovies = (event) => {
    console.log('remove button clicked')
    axios.delete('/api/savedTitles', {
      data: {
        user_id: event.target.dataset.user,
        tmdb_id: event.target.dataset.id
      }
    })
      .then(() => {
        return getUserMovies();
      })
      .then((data) => {
        setMovies(data)
      })
      .catch((error) => {
        console.log('error getting user movies: ', error);
      })
  }


  useEffect(() => {

    getUserMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.log('error getting user movies on dashboard: ', error);
      })
    getUserSuggestions()
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.log('error getting user suggestions on dashboard: ', error);
      })

  }, [])

  // let dummyData =
  //   [
  //     {
  //       "_id": "61c218b65ccc68c0a27c1c0d",
  //       "user_id": "user3",
  //       "type": "movie",
  //       "tmdb_id": 634649,
  //       "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  //       "createdAt": "2021-12-21T18:11:02.569Z",
  //       "updatedAt": "2021-12-21T18:11:02.569Z",
  //       "__v": 0
  //     },
  //     {
  //       "_id": "61c2188a5ccc68c0a27c1c09",
  //       "user_id": "user3",
  //       "type": "tv",
  //       "tmdb_id": 73586,
  //       "poster_path": "https://image.tmdb.org/t/p/w500/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
  //       "createdAt": "2021-12-21T18:10:18.567Z",
  //       "updatedAt": "2021-12-21T18:10:18.567Z",
  //       "__v": 0
  //     },
  //     {
  //       "_id": "61c21216830e32670425c966",
  //       "user_id": "user3",
  //       "type": "tv",
  //       "tmdb_id": 131927,
  //       "poster_path": "https://image.tmdb.org/t/p/w500/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
  //       "createdAt": "2021-12-21T17:42:46.557Z",
  //       "updatedAt": "2021-12-21T17:42:46.557Z",
  //       "__v": 0
  //     },

  //     {
  //       "_id": "61c218b65ccc68c0a27c1c0d",
  //       "user_id": "user3",
  //       "type": "movie",
  //       "tmdb_id": 634649,
  //       "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  //       "createdAt": "2021-12-21T18:11:02.569Z",
  //       "updatedAt": "2021-12-21T18:11:02.569Z",
  //       "__v": 0
  //     }

  //   ]

  return (
    <>
      <Navbar handleLogout={props.handleLogout} />
      <h1>User Dashboard</h1>
      {/* <MyMovies title='My Movies' movies={dummyData} getUserMovies={getUserMovies} setMovies={setMovies} removeFromMyMovies={removeFromMyMovies} /> */}
      {/* <Suggestions title='Suggestions For You' movies={dummyData} /> */}
      {userMovies ? <MyMovies
        title='My Movies'
        removeFromMyMovies={removeFromMyMovies}
        movies={userMovies}
        getUserMovies={getUserMovies}
        setMovies={setMovies} /> : <></>}
      {userSuggestions ? <Suggestions title='Suggestions For You' movies={userSuggestions} /> : <></>}
    </>
  )
}