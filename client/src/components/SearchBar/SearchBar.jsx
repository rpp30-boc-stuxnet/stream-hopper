import React from 'react'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={this.state.searchTerm}
          onChange={(event) => this.setState({searchTerm: event.target.value})}
        />
      </div>
    )
  }
}

export default SearchBar