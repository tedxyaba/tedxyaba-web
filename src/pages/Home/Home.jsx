import React, { Component } from 'react';
import './Home.scss';
import Carousel from '../../segments/Carousel';
import NextEvent from '../../segments/NextEvent';
import landingPage from '../../services/landing-page';
import TransformHomepageData from '../../utils/data-transformers/homepage';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      data: [],
      errors: null
    }

    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    landingPage.get((success, data) => {
      if (success) {
        this.setState({
          loading: false,
          data: TransformHomepageData(data)
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
    const { loading } = this.state;
    console.log(this.state);

    return (
      <div className="page-home">
        { loading ? (
          <div className="my-4 text-center">Loading Homepage...</div>
        ) : (
          <div className="page-home-content">
            <Carousel />
            <NextEvent  />

            <h1>Welcome to TedxYaba!</h1>
            <p>Independently organised TED event</p>
          </div>
        ) }
      </div>
    )
  }
}

export default Home
