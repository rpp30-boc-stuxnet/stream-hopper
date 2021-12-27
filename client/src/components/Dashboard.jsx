import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyMovies from './MyMovies/MyMovies.jsx';
import Suggestions from './Suggestions/Suggestions.jsx';

let testData =
  [
    {
      "_id": "61c218b65ccc68c0a27c1c0d",
      "user_id": "user3",
      "type": "movie",
      "tmdb_id": 634649,
      "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      "createdAt": "2021-12-21T18:11:02.569Z",
      "updatedAt": "2021-12-21T18:11:02.569Z",
      "__v": 0
    },
    {
      "_id": "61c2188a5ccc68c0a27c1c09",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 73586,
      "poster_path": "https://image.tmdb.org/t/p/w500/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
      "createdAt": "2021-12-21T18:10:18.567Z",
      "updatedAt": "2021-12-21T18:10:18.567Z",
      "__v": 0
    },
    {
      "_id": "61c21216830e32670425c966",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 131927,
      "poster_path": "https://image.tmdb.org/t/p/w500/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
      "createdAt": "2021-12-21T17:42:46.557Z",
      "updatedAt": "2021-12-21T17:42:46.557Z",
      "__v": 0
    },
    {
      "_id": "61c218b65ccc68c0a27c1c0d",
      "user_id": "user3",
      "type": "movie",
      "tmdb_id": 634649,
      "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      "createdAt": "2021-12-21T18:11:02.569Z",
      "updatedAt": "2021-12-21T18:11:02.569Z",
      "__v": 0
    },
    {
      "_id": "61c2188a5ccc68c0a27c1c09",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 73586,
      "poster_path": "https://image.tmdb.org/t/p/w500/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
      "createdAt": "2021-12-21T18:10:18.567Z",
      "updatedAt": "2021-12-21T18:10:18.567Z",
      "__v": 0
    },
    {
      "_id": "61c21216830e32670425c966",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 131927,
      "poster_path": "https://image.tmdb.org/t/p/w500/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
      "createdAt": "2021-12-21T17:42:46.557Z",
      "updatedAt": "2021-12-21T17:42:46.557Z",
      "__v": 0
    },
    {
      "_id": "61c218b65ccc68c0a27c1c0d",
      "user_id": "user3",
      "type": "movie",
      "tmdb_id": 634649,
      "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      "createdAt": "2021-12-21T18:11:02.569Z",
      "updatedAt": "2021-12-21T18:11:02.569Z",
      "__v": 0
    },
    {
      "_id": "61c2188a5ccc68c0a27c1c09",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 73586,
      "poster_path": "https://image.tmdb.org/t/p/w500/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
      "createdAt": "2021-12-21T18:10:18.567Z",
      "updatedAt": "2021-12-21T18:10:18.567Z",
      "__v": 0
    },
    {
      "_id": "61c21216830e32670425c966",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 131927,
      "poster_path": "https://image.tmdb.org/t/p/w500/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
      "createdAt": "2021-12-21T17:42:46.557Z",
      "updatedAt": "2021-12-21T17:42:46.557Z",
      "__v": 0
    }
  ]

let testSuggestions =
  [
    {
      "type": "movie",
      "tmdb_id": 511809,
      "poster_path": "https://image.tmdb.org/t/p/w500/zeAZTPxV5xZRNEX3rZotnsp7IVo.jpg"
    },
    {
      "type": "tv",
      "tmdb_id": 97951,
      "poster_path": "https://image.tmdb.org/t/p/w500/si7bdZDEmdqJAMGutAIzcfqVQTw.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 593395,
      "poster_path": "https://image.tmdb.org/t/p/w500/4wQ3TFoV17DdSiEJQlaEKtU8UVT.jpg"
    },
    {
      "type": "tv",
      "tmdb_id": 66025,
      "poster_path": "https://image.tmdb.org/t/p/w500/wOPVaXMZ61Z0t2QezdQWvZbPCLi.jpg"
    },
    {
      "type": "tv",
      "tmdb_id": 71146,
      "poster_path": "https://image.tmdb.org/t/p/w500/28cIK70tN2t4gPTV8CBQZED1H2G.jpg"
    }
  ]

export default function Dashboard(props) {

  const [userMovies, setMovies] = useState(null);
  const [userSuggestions, setSuggestions] = useState(null);

  let dataTestFn = () => {
    return new Promise((resolve, reject) => {
      resolve(testData)
    })
  }

  let suggestionsTestFn = () => {
    return new Promise((resolve, reject) => {
      resolve(testSuggestions)
    })
  }

  // const updateMyMovies = () => {
  //   console.log('button was clicked')
  //   axios.get('/savedTitles', {
  //     params: {
  //       user_id: 'user3'
  //     }
  //   })
  //     .then((response) => {
  //       console.log('success updating my movies: ', response);
  //       setMovies(previousState => {
  //         return response.data
  //       });
  //     })
  //     .catch((error) => {
  //       console.log('error updating my movies')
  //     })
  // }

  // const getUserMovies = () => {
  //   axios.get('/savedTitles', {
  //     params: {
  //       user_id: 'user3'
  //     }
  //   })
  //     .then((response) => {
  //       console.log('success getting My Movies: ', response);
  //       setMovies(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('error getting My Movies: ', error);
  //     })

  // }

  const getUserMovies = () => {
    dataTestFn()
      .then((data) => {
        console.log('got the data: ', data);
        setMovies(data);
      })
      .catch((error) => {
        console.log('there was an error')
      })
  }

  const getUserSuggestions = () => {
    suggestionsTestFn()
      .then((data) => {
        console.log('got the data: ', data);
        setSuggestions(data);
      })
      .catch((error) => {
        console.log('there was an error')
      })
  }

  useEffect(() => {

    getUserMovies();
    getUserSuggestions();

  }, [])

  const dummyData = [
    {
      "_id": "61c218b65ccc68c0a27c1c0d",
      "user_id": "user3",
      "type": "movie",
      "tmdb_id": 634649,
      "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      "createdAt": "2021-12-21T18:11:02.569Z",
      "updatedAt": "2021-12-21T18:11:02.569Z",
      "__v": 0
    },
    {
      "_id": "61c2188a5ccc68c0a27c1c09",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 73586,
      "poster_path": "https://image.tmdb.org/t/p/w500/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
      "createdAt": "2021-12-21T18:10:18.567Z",
      "updatedAt": "2021-12-21T18:10:18.567Z",
      "__v": 0
    },
    {
      "_id": "61c21216830e32670425c966",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 131927,
      "poster_path": "https://image.tmdb.org/t/p/w500/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
      "createdAt": "2021-12-21T17:42:46.557Z",
      "updatedAt": "2021-12-21T17:42:46.557Z",
      "__v": 0
    },
    {
      "_id": "61c218b65ccc68c0a27c1c0d",
      "user_id": "user3",
      "type": "movie",
      "tmdb_id": 634649,
      "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      "createdAt": "2021-12-21T18:11:02.569Z",
      "updatedAt": "2021-12-21T18:11:02.569Z",
      "__v": 0
    },
    {
      "_id": "61c2188a5ccc68c0a27c1c09",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 73586,
      "poster_path": "https://image.tmdb.org/t/p/w500/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
      "createdAt": "2021-12-21T18:10:18.567Z",
      "updatedAt": "2021-12-21T18:10:18.567Z",
      "__v": 0
    },
    {
      "_id": "61c21216830e32670425c966",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 131927,
      "poster_path": "https://image.tmdb.org/t/p/w500/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
      "createdAt": "2021-12-21T17:42:46.557Z",
      "updatedAt": "2021-12-21T17:42:46.557Z",
      "__v": 0
    },
    {
      "_id": "61c218b65ccc68c0a27c1c0d",
      "user_id": "user3",
      "type": "movie",
      "tmdb_id": 634649,
      "poster_path": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
      "createdAt": "2021-12-21T18:11:02.569Z",
      "updatedAt": "2021-12-21T18:11:02.569Z",
      "__v": 0
    },
    {
      "_id": "61c2188a5ccc68c0a27c1c09",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 73586,
      "poster_path": "https://image.tmdb.org/t/p/w500/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
      "createdAt": "2021-12-21T18:10:18.567Z",
      "updatedAt": "2021-12-21T18:10:18.567Z",
      "__v": 0
    },
    {
      "_id": "61c21216830e32670425c966",
      "user_id": "user3",
      "type": "tv",
      "tmdb_id": 131927,
      "poster_path": "https://image.tmdb.org/t/p/w500/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
      "createdAt": "2021-12-21T17:42:46.557Z",
      "updatedAt": "2021-12-21T17:42:46.557Z",
      "__v": 0
    }
  ]

  const dummySuggestions = [
    {
      "type": "movie",
      "tmdb_id": 511809,
      "poster_path": "https://image.tmdb.org/t/p/w500/zeAZTPxV5xZRNEX3rZotnsp7IVo.jpg"
    },
    {
      "type": "tv",
      "tmdb_id": 97951,
      "poster_path": "https://image.tmdb.org/t/p/w500/si7bdZDEmdqJAMGutAIzcfqVQTw.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 593395,
      "poster_path": "https://image.tmdb.org/t/p/w500/4wQ3TFoV17DdSiEJQlaEKtU8UVT.jpg"
    },
    {
      "type": "tv",
      "tmdb_id": 66025,
      "poster_path": "https://image.tmdb.org/t/p/w500/wOPVaXMZ61Z0t2QezdQWvZbPCLi.jpg"
    },
    {
      "type": "tv",
      "tmdb_id": 71146,
      "poster_path": "https://image.tmdb.org/t/p/w500/28cIK70tN2t4gPTV8CBQZED1H2G.jpg"
    }
  ]
  return (
    <>
      <button onClick={props.handleLogout}>Logout</button>
      <h1>User Dashboard</h1>
      <button></button>
      {userMovies ? <MyMovies title='My Movies' movies={userMovies} /> : <></>}
      {userSuggestions ? <Suggestions title='Suggestions For You' movies={userSuggestions} /> : <></>}
      {/* <Suggestions title='Suggestions For You' movies={userMovies} /> */}
    </>
  )
}