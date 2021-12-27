import React from 'react';
import axios from 'axios';
import logo from '../../logo.svg';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testResult: 'Hello'
    }
  }

  componentDidMount() {
    axios.get('/api/testDbData')
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
        <p>Stream Hopper</p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Test DB call: {this.state.testResult}</p>
      </div>
    )
  }
}

export default TestComponent;