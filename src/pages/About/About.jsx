import React, { Component } from 'react';
import './About.scss';
import apiClient from '../../services/api-client';
import TransformAboutpageData from '../../utils/data-transformers/aboutpage';
import apiRoutes from "../../utils/routes";
import AboutSection from './AboutSection'

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
      <div className="container-fluid">
        { loading ? (
          <div className="my-4 text-center">Loading...</div>
        ) : (
          <div className="row">
            <div className="col-sm">
              <img src={data.displayImage.url} className="d-block w-100" alt={data.displayImage.alt} />
            </div>

            <div className="col-sm">
              {
                data.aboutSections.map((section, index) => {
                  return <AboutSection title={section.sectionTitle} description={section.sectionDescription} key={index} />
                })
              }
            </div>
          </div>
        ) }
      </div>
    )
  }
}

export default About
