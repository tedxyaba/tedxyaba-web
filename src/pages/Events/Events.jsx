import React, { Component } from 'react';
import './Events.scss';
import apiClient from '../../services/api-client';
import TransformEventsListData from '../../utils/data-transformers/eventslist';
import apiRoutes from "../../utils/routes";

class Events extends Component {
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
    const apRoute = apiRoutes.events();
    const cb = (success, data) => {
      if (success) {
        this.setState({
          loading: false,
          data: TransformEventsListData(data)
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
    const EventBox = (props) => {
      return (
        <div className="px-3 py-5 col-4 text-truncate" key={props.index}>
          <div className="card">
            <img src={props.image.thumbnail_list_url} className="card-img-top" alt={props.image.alt} />
            <div className="card-body text-truncate">
              <h6 className="card-title">
                <a href={''} target={''} className="card-link">{ props.title }</a>
              </h6>
              <small className="text-muted">{ props.summary }</small>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="container-fluid">
        { loading ? (
          // replace this with the new loading component
          <div className="my-4 text-center">Loading...</div>
        ) : (
          <div className="row">
            {
              data.map((event, index) => {
                return <EventBox key={index} {...event} />
              })
            }
          </div>
        ) }
      </div>
    )
  }
}

export default Events
