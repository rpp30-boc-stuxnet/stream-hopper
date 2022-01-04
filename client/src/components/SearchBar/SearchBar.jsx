import React from 'react'
import { Link } from "react-router-dom";
const axios = require('axios')


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchData: [],
    }
    this.searchChange = this.searchChange.bind(this);
<<<<<<< HEAD
    this.searchEnter = this.searchEnter.bind(this);
  }

  searchEnter = (e) => {
    if (e.key === 'Enter') {
      console.log('ENTER WAS PRESSED')
    }
=======
    this.makeList = this.makeList.bind(this);
>>>>>>> cce22a56ec230126663d8051ce6bd9e3e0d14031
  }

  searchChange (e) {
    axios.get('/api/search', {
      params: {
        title: e.target.value
      }
    })
    .then((res) => {
      console.log(res.data)
      this.setState({searchData: res.data})
    })
    .catch((err) => {
      console.log(err)
      });
  }

  makeList (data) {
    return data.map((data, index) => {
      return (
        <div key={index}>
          <div style={{display:'inline'}}>
          <img src={data.poster_path} alt='movie poster' width="40px" height="40px"></img>
          <span style={{fontSize: "10px", display:"block",color:"black"}}>{data.release_date}</span>
          <span style={{fontSize: "10px", display:"block",color:"black"}}>{data.title}</span>
          </div>
        </div>
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
            onKeyPress={(event) => this.searchEnter(event)}
          />
        </div>
<<<<<<< HEAD
         {this.state.searchData.length > 0 && (
        <div className="dataResults">
          {this.state.searchData.map((data, index) => {
            return (
              <div key={index}>
                <Link to={`/movieDetails/${data.tmdb_id}`}>
                <div style={{display:'inline'}}>
                <img src={data.poster_path !== 'https://image.tmdb.org/t/p/w500null' ? data.poster_path : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt='movie poster' width="40px" height="40px"></img>
                <span style={{fontSize: "10px", display:"block",color:"black"}}>{data.release_date}</span>
                <span style={{fontSize: "10px", display:"block"   ,color:"black"}}>{data.title}</span>
              </div>
              </Link>
            </div>
            )
          })}
        </div>
         )}
=======
        {this.state.searchData.length > 0 ?
          <div className="dataResults">
            {this.makeList(this.state.searchData)}
          </div>
          : <></>
        }
>>>>>>> cce22a56ec230126663d8051ce6bd9e3e0d14031
      </div>
    )
  }
}

export default SearchBar