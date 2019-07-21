import React, { Component } from 'react';
import './Home.scss';
import Carousel from '../../segments/Carousel';
import NextEvent from '../../segments/NextEvent';
import apiClient from '../../services/api-client';
import TransformHomepageData from '../../utils/data-transformers/homepage';
import apiRoutes from "../../utils/routes";
import Loading from "../components/loading";

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
    const lpRoute = apiRoutes.landingPage();
    const cb = (success, data) => {
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
    }
    apiClient.get(lpRoute, cb)
  }

  render() {
    const { loading, data } = this.state;
    console.log('HOME===> ', this.state);

    return (
      <div className="page-home">
        { loading ? (
          <Loading page="Homepage" />
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
