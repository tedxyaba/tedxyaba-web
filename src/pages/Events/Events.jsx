import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Events.scss';
import apiClient from '../../services/api-client';
import apiRoutes from "../../utils/routes";
import moment from 'moment';
import Loading from "../../components/loading";
import TransformEventsListData from '../../utils/data-transformers/eventslist';
import defaultEventImage from '../../assets/images/defaults/default-event.jpg';
import Section from '../../components/ui/Section';
import Join from '../../segments/Join';
import Footer from '../../segments/Footer';

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
    const eventsRoute = apiRoutes.events();
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
    apiClient.get(eventsRoute, cb)
  }

  render() {
    const { loading, data } = this.state;

    const EventBox = (event) => {
      return (
        <div className="mb-2 col-md-6 event">
          <Link to={`/events/${event.id}`}>
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={event.image.thumbnail_list_url || defaultEventImage} className="card-img" alt={event.image.alt} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{ event.title }</h5>
                    <p><span className="badge badge-pill badge-light">{event.event_type}</span></p>
                    <p className="card-text"><small className="text-muted">{ moment(event.eventDate).format('Do MMMM YYYY') }</small></p>
                    <p className="card-text text-truncate">{ event.summary }</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )
    }

    const YearlyEvents = (props) => {
      return (
        <Fragment>
          <Section title={props.year} classNames="px-0">
            <div className="row">
              {
                props.events.map((event, index) => (
                  <EventBox key={index} {...event} />
                ))
              }
            </div>
          </Section>
        </Fragment>
      )
    }

    return (
      <div className="events">
        { loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="event-banner">
              <div className="overlay">
                <h3>EVENTS</h3>
              </div>
            </div>

            <div className="container">
              {
                Object.keys(data).sort((a,b) => b - a).map( year => (
                  <YearlyEvents key={year} year={year} events={data[year]} />
                ))
              }
            </div>

            <Join />
            <Footer />
          </Fragment>
        ) }
      </div>
    )
  }
}

export default Events
