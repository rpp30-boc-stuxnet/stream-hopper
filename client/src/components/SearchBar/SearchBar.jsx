import React from 'react'
import { Link } from 'react-router-dom'
const axios = require('axios')


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchData: [],
    }
    this.searchChange = this.searchChange.bind(this);
    this.makeList = this.makeList.bind(this);
    this.searchEnter = this.searchEnter.bind(this)
  }

  searchEnter = (e) => {
    if (e.key === 'Enter') {
      console.log('ENTER WAS PRESSED')
    }
  }

  searchChange = (e) => {
    axios.get('/api/search', {
      params: {
        title: e.target.value
      }
    })
    .then((res) => {
      // console.log(res)
      this.setState({searchData: res.data})
    })
    .catch((err) => {
      console.log(err)
      });
  }

  makeList = (data) => {
    return data.map((data, index) => {
      return (
        <Link to={`/details/${data.tmdb_id}/${data.type}`}>
          <div style={{display:'inline'}}>
          <img src={data.poster_path} alt='movie poster' width="40px" height="40px"></img>
          <div style={{fontSize: "10px", display:"block",color:"black"}}>{data.release_date}</div>
          <div style={{fontSize: "10px", display:"block",color:"black"}}>{data.title}</div>
          </div>
        </Link>
      )
    })
  }

  render() {
    return (
<<<<<<< HEAD
      <div>
        <input
          type="text"
          className="searchInput"
          placeholder="search for a movie or tv show"
          value={this.state.searchTerm}
          onChange={(event) => this.searchChange(event)}
        />
        {(this.state.searchData.length > 0 && this.state.searchTerm !== '') ?
=======
      <div className="search-bar">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="search for a movie or tv show"
            value={this.state.searchTerm}
            onChange={(event) => this.searchChange(event)}
          />
        </div>
        {this.state.searchData.length > 0 ?
>>>>>>> staging
          <div className="dataResults">
            {this.makeList(this.state.searchData)}
          </div>
          : <></>
        }
      </div>
    )
  }
}

export default SearchBar
