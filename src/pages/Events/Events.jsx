import './Events.scss';
import apiClient from '../../services/api-client';
import apiRoutes from "../../utils/routes";
import moment from 'moment';
import React, { Component } from 'react';
import TransformEventsListData from '../../utils/data-transformers/eventslist';

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
        <div className="px-3 py-5 col-md-6 text-truncate">
          <div className="card">
            <div className="card-body row">
              <div className="col-4">
                <img src={props.image.thumbnail_list_url} className="card-img-top" alt={props.image.alt} />
              </div>
              <div className="col-8 text-truncate">
                <h4 className="card-title">{ props.title }</h4>
                <p className="event-date">{ moment(props.eventDate).format('Do MMMM YYYY') }</p>
                <small className="text-muted">{ props.summary }</small>
                <div className="event-cta">
                  <a href={''} target={''} className="btn btn-primary">View Details</a>
                </div>
              </div>
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
