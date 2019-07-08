import React, { Component } from 'react';
import './Home.scss';
import Carousel from '../../segments/Carousel';
import NextEvent from '../../segments/NextEvent';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="page-home">
        <Carousel />
        <NextEvent />

        <h1>Welcome to TedxYaba!</h1>
        <p>Independently organised TED event</p>
      </div>
    )
  }
}

export default Home
