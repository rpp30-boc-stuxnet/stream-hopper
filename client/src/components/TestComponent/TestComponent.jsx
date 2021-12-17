import React from 'react';
import axios from 'axios';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testString: 'Hello'
    }
  }

  componentDidMount() {
    axios.get('/testroute')
    .then(
      (response) => {
        this.setState({
          testString: response.data
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
        <p>{this.state.testString}</p>
        <p>New Paragraph</p>
      </div>
    )
  }
}

export default TestComponent;