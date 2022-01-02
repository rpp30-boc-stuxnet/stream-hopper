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

  const addToMyMovies = (event) => {
    axios.post('/api/savedTitles', {
      user_id: window.localStorage.userUID,
      type: event.target.dataset.type,
      tmdb_id: event.target.dataset.id
    })
      .then(() => {
        return getUserMovies();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.log('error adding title to my movies: ', error);
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

  return (
    <>
      <Navbar handleLogout={props.handleLogout} />
      <h1>User Dashboard</h1>

      {userMovies !== null ? <MyMovies
        title='My Movies'
        removeFromMyMovies={removeFromMyMovies}
        movies={userMovies}
        getUserMovies={getUserMovies}
        setMovies={setMovies} /> : <></>}
      {userSuggestions !== null && userSuggestions === 0 ? <Suggestions
        title='Suggestions For You'
        movies={userSuggestions}
        addToMyMovies={addToMyMovies} /> : <></>}
    </>
  )
}