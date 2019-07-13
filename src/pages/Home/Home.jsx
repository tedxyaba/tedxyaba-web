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
      data: {},
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
    const { loading, data } = this.state;
    console.log('HOME===> ', this.state);

    return (
      <div className="page-home">
        { loading ? (
          <div className="text-center my-5">
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only">Loading Homepage...</span>
            </div>
          </div>
        ) : (
          <div className="page-home-content">
            <Carousel images={data.carouselImages || []} />
            <NextEvent event={data.currentEvent}  />
          </div>
        ) }
      </div>
    )
  }
}

export default Home
