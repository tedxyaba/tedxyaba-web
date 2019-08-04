import React, { Component } from 'react';
import './Home.scss';
import Carousel from '../../segments/Carousel';
import NextEvent from '../../segments/NextEvent';
import apiClient from '../../services/api-client';
import TransformHomepageData from '../../utils/data-transformers/homepage';
import apiRoutes from "../../utils/routes";
import Loading from "../../components/loading";
import PreviousEvents from '../../segments/PreviousEvents';
// import Subscribe from '../../segments/Subscribe';
import Footer from '../../segments/Footer';
import Join from '../../segments/Join';

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

    return (
      <div className="page-home">
        { loading ? (
          <Loading page="Homepage" />
        ) : (
          <div className="page-home-content">
            <Carousel images={data.carouselImages || []} />
            <TinyAbout data={data.landingDescription} />
            <NextEvent event={data.currentEvent}  />
            <PreviousEvents />
            <Join link={data.linkToVolunteerForm} />
            {/* <Subscribe /> */}
            <Footer />
          </div>
        ) }
      </div>
    )
  }
}

const TinyAbout = ({data}) => {
  return (
    <div className="container tiny-about mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7">
          {
            data.map((item, index) => {
              return (
                <div key={index} className="content text-center">
                  <p className="text">{item.text}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home
