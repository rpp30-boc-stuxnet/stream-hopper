import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyTitlesList from './MyTitles/MyTitlesList.jsx';
import SuggestionsList from './Suggestions/SuggestionsList.jsx';




export default function Dashboard(props) {

  const [userMovies, setMovies] = useState(null);
  const [userSuggestions, setSuggestions] = useState(null);
  const [spielbergTitles, setSpielberg] = useState(null);
  const [trendingTitles, setTrending] = useState(null);

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

  const getSpielbergTitles = () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/spielbergTitles', {
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

  const getTrendingTitles = () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/trendingTitles', {
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
  }, [])

  useEffect(() => {
    getUserSuggestions()
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.log('error getting user suggestions on dashboard: ', error);
      })
  }, [userMovies])

  useEffect(() => {
    getSpielbergTitles()
      .then((data) => {
        setSpielberg(data);
      })
      .catch((error) => {
        console.log('Error retrieving Spielberg titles on dashboard: ', error);
      })
  }, [])

  useEffect(() => {
    getTrendingTitles()
      .then((data) => {
        setTrending(data);
      })
      .catch((error) => {
        console.log('error getting trending titles on dashboard: ', error);
      })
  }, [])

  return (
    <>

      <main className={'dashboard'}>
        {/* <h1>Hello {window.localStorage.userEmail.split('@')[0]}</h1> */}
        <h1>Hello</h1>

        {userMovies ? <MyTitlesList
          title='My Titles'
          data_testid={1}
          removeFromMyMovies={removeFromMyMovies}
          addToMyMovies={addToMyMovies}
          movies={userMovies}
          getUserMovies={getUserMovies} /> : <>No Titles Yet!</>}

        {userSuggestions !== null && userSuggestions[0] ? <SuggestionsList
          title='Suggestions For You'
          data_testid={1}
          movies={userSuggestions}
          addToMyMovies={addToMyMovies} /> : <></>}

        {spielbergTitles ? <MyTitlesList
          title='Our Favorites'
          data_testid={1}
          movies={spielbergTitles}
          addToMyMovies={addToMyMovies} /> : <></>}

        {trendingTitles ? <MyTitlesList
          title='Now Trending'
          data_testid={1}
          movies={trendingTitles}
          addToMyMovies={addToMyMovies} /> : <></>}
      </main>

    </>
  )
}
