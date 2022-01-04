import React from 'react'
const axios = require('axios')
import { Link } from 'react-router-dom'


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

  searchChange (e) {
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

  makeList (data) {
    return data.map((data, index) => {
      return (
        <Link to={`/movieDetails/${data.tmdb_id}`}>
        <div style={{display:'inline'}}>
        <img src={data.poster_path} alt='movie poster' width="40px" height="40px"></img>
        <span style={{fontSize: "10px", display:"block",color:"black"}}>{data.release_date}</span>
        <span style={{fontSize: "10px", display:"block",color:"black"}}>{data.title}</span>
        </div>
        </Link>
      )
    })
  }

  render() {
    return (
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
