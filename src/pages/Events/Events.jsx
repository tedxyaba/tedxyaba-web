import './Events.scss';
import apiClient from '../../services/api-client';
import apiRoutes from "../../utils/routes";
import moment from 'moment';
import Loading from "../components/loading";
import React, { Component } from 'react';
import TransformEventsListData from '../../utils/data-transformers/eventslist';

class Events extends Component {
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

  groupByYear(events) {
    const reducer = (h, event) => {
      const year = moment(event.eventDate).format('YYYY')
      h[year] = (h[year] || []).concat(event);
      return h;
    }
    return events.reduce(reducer, {})
  }

  _fetchData() {
    const apRoute = apiRoutes.events();
    const cb = (success, data) => {
      if (success) {
        const serialized = TransformEventsListData(data)
        this.setState({
          loading: false,
          data: this.groupByYear(serialized)
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
    const EventBox = (event) => {
      return (
        <div className="px-3 pb-5 col-md-6 text-truncate">
          <div className="card">
            <div className="card-body row">
              <div className="col-4">
                <img src={event.image.thumbnail_list_url} className="card-img-top" alt={event.image.alt} />
              </div>
              <div className="col-8 text-truncate">
                <h4 className="card-title">{ event.title }</h4>
                <p className="event-date">{ moment(event.eventDate).format('Do MMMM YYYY') }</p>
                <small className="text-muted">{ event.summary }</small>
                <div className="event-cta">
                  <a href={''} target={''} className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const YearlyEvents = (props) => {
      return (
        <div>
          <h5 className='px-3 font-weight-bold' style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
            {props.year}
            <hr className='my-1' style={{display: 'inline-block', width: '100%'}} />
          </h5>
          <div className="row">
            {
              props.events.map((event, index) => {
                return <EventBox key={index} {...event} />
              })
            }
          </div>
        </div>
      )
    }

    return (
      <div className="container-fluid">
        { loading ? (
          <Loading />
        ) : (
          <div>
            {
              Object.keys(data).map( year => {
                return <YearlyEvents key={year} year={year} events={data[year]} />
              })
            }
          </div>
        ) }
      </div>
    )
  }
}

export default Events
