import React from 'react'
const axios = require('axios')


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchData: [],
    }
    this.searchChange = this.searchChange.bind(this);
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
        <div className="dataResults">
          {this.state.searchData.map((data, index) => {
            return (
              <div key={index}>
                <div style={{display:'inline'}}>
                <img src={data.poster_path} alt='movie poster' width="40px" height="40px"></img>
                <span style={{fontSize: "10px", display:"block",color:"black"}}>{data.release_date}</span>
                <span style={{fontSize: "10px", display:"block",color:"black"}}>{data.title}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SearchBar