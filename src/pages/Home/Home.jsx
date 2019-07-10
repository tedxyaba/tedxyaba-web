import React, { Component } from 'react';
import './Home.scss';
import Carousel from '../../segments/Carousel';
import NextEvent from '../../segments/NextEvent';
import landingPage from '../../services/landing-page';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
      errors: null
    }

    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    this.setState({
      loading: true, errors: null
    });

    landingPage.get((success, data) => {
      const { results } = data;

      if (success) {
        this.setState({
          loading: false,
          data: results
        })
      } else {
        this.setState({
          loading: false,
          errors: data
        })
      }
    })
  }

  render() {
    console.log(this.state);

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
