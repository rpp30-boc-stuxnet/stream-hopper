import React from 'react';
import axios from 'axios';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testResult: 'Hello'
    }
  }

  componentDidMount() {
    axios.get('/testDbData')
    .then(
      (response) => {
        this.setState({
          testResult: JSON.stringify(response.data)
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
        <p>Test DB call: {this.state.testResult}</p>
      </div>
    )
  }
}

export default TestComponent;