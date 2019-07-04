import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div class="page-home">
        <h1>Welcome to TedxYaba!</h1>
        <p>Independently organised TED event</p>
      </div>
    )
  }
}

export default Home
