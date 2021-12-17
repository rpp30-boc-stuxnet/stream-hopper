import React from 'react';
import axios from 'axios';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstMovieTitle: 'Hello'
    }
  }

  componentDidMount() {
    axios.get('/testDbData')
    .then(
      (response) => {
        console.dir(response)
        this.setState({
          firstMovieTitle: response.data[0].title
        })
      }
    )

    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.firstMovieTitle}</p>
      </div>
    )
  }
}

export default TestComponent;