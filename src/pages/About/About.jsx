import React, { Component, Fragment } from 'react';
import './About.scss';
import apiClient from '../../services/api-client';
import TransformAboutpageData from '../../utils/data-transformers/aboutpage';
import apiRoutes from "../../utils/routes";
import Loading from '../../components/loading';
import Join from '../../segments/Join';
import Footer from '../../segments/Footer';

class About extends Component {
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
    const apRoute = apiRoutes.aboutPage();
    const cb = (success, data) => {
      if (success) {
        this.setState({
          loading: false,
          data: TransformAboutpageData(data)
        })
      } else {
        this.setState({
          loading: false,
          errors: data
        })
      }
    }
    apiClient.get(apRoute, cb)
  }

  render() {
    const { loading, data } = this.state;

    return (
      <div className="about">
        { loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div
              className="about-banner"
              style={{
                backgroundImage: `url(${data.displayImage.url})`,
                backgroundImage: `linear-gradient(to bottom right, rgba(230,43,31,0.6), rgba(230,43,31,0.1)),url(${data.displayImage.url})`
              }}>
              <div className="overlay">
                <h3>ABOUT TEDx</h3>
              </div>
            </div>

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                  {
                    data.aboutSections.map((section, index) => {
                      return (
                        <div key={index} className="content text-center">
                          <p className="title">{section.sectionTitle}</p>
                          <p className="text">{section.sectionDescription}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <Join />
            <Footer />
          </Fragment>
        ) }
      </div>
    )
  }
}

export default About
