import React from 'react'
const axios = require('axios')


class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchData: [],
    }
  }

  searchChange = (e) => {
    axios.get('/api/search', {
      params: {
        title: e.target.value
      }
    })
    .then((res) => {
      console.log(res)
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
            onChange={(event) => this.setState({searchTerm: event.target.value})}
          />
        </div>
        <div className="dataResults">
          {this.state.searchData.map((data, index) => {
            return (
              <div key={index}>
                <div className="dataItem">{data.poster_path}{data.release_date}{data.title}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SearchBar