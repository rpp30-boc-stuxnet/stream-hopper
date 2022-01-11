import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const axios = require('axios')


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      searchData: [],
    }
    this.searchChange = this.searchChange.bind(this);
    this.makeList = this.makeList.bind(this);
    this.searchEnter = this.searchEnter.bind(this);
  }

  searchEnter = (e) => {
    if (e.key === 'Enter') {
      console.log('ENTER WAS PRESSED')
    }
  }

  searchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
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
        <Link to={`/details/${data.tmdb_id}/${data.type}`} onClick={() => {useNavigate(`/details/${data.tmdb_id}/${data.type}`)}}>
          <div className="dataItem" key={index}>
            <img className="dataImg" src={data.poster_path} alt='movie poster'></img>
            <div className="dataText">
              <span>{data.title}</span>
              <span>{data.release_date}</span>
            </div>
          </div>
        </Link>
      )
    })
  }

  render() {
    return (
      <div className='searchContainer'>
        <input
          type="text"
          className="searchInput"
          placeholder="search for a movie or tv show"
          value={this.state.searchTerm}
          onChange={(event) => this.searchChange(event)}
          onKeyPress={(event) => this.searchEnter(event)}
        />
        {(this.state.searchData.length > 0 && this.state.searchTerm !== '') ?
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
