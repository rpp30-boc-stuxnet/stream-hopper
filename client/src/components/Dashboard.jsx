import React from 'react';
import MyMovies from './MyMovies/MyMovies.jsx';
import Suggestions from './Suggestions/Suggestions.jsx';
export default function Dashboard() {
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
      <h1>User Dashboard</h1>
      <MyMovies title='My Movies' movies={dummyData} />
      <Suggestions title='Suggestions For You' movies={dummySuggestions} />
    </>
  )
}