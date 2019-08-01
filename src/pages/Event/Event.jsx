import React, { Component, Fragment } from 'react';
import './Event.scss';
import apiClient from '../../services/api-client';
import apiRoutes from "../../utils/routes";
import Loading from "../../components/loading";
import TransformEventsListData from '../../utils/data-transformers/eventslist';
import Join from '../../segments/Join';
import Footer from '../../segments/Footer';
import moment from 'moment';

class Event extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: '',
      loading: true,
      event: {},
      errors: null
    }

    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.eventId) {
      this.setState({
        eventId: this.props.match.params.eventId
      })

      this._fetchData(this.props.match.params.eventId);
    }
  }

  _fetchData(eventId) {
    const eventRoute = apiRoutes.documentById(eventId);
    const cb = (success, data) => {
      if (success) {
        this.setState({
          loading: false,
          event: TransformEventsListData(data)[0]
        })
      } else {
        this.setState({
          loading: false,
          errors: data
        })
      }
    }
    apiClient.get(eventRoute, cb)
  }

  render() {
    const { loading, event } = this.state;

    console.log(event)

    if (loading)
      return <Loading />
    else {
      return (
        <Fragment>
            { event && !!Object.keys(event).length ? (
              <div className="event">
                <div
                  className="event-banner"
                  style={{
                    backgroundImage: `url(${event.image.url})`,
                    backgroundImage: `linear-gradient(to bottom right, rgba(230,43,31,0.6), rgba(230,43,31,0.1)),url(${event.image.url})`
                  }}>
                  <div className="overlay">
                    <h3>{event.title}</h3>
                  </div>
                </div>

                <div className="container event-content">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-6 text-center">
                      <p><span className="badge badge-pill badge-light">{event.event_type}</span></p>

                      <p className="summary">{ event.summary }</p>

                      <div className="description">
                        { event.description.map((d, i) => (
                          <p key={i}>{ d }</p>
                        )) }
                      </div>

                      <div className="venue">
                        <p>{ event.event_venue }</p>
                      </div>

                      <div>
                        <p className="event-date">{ moment(event.eventDate).format('Do MMMM YYYY') }</p>
                        <p className="event-date">{ moment(event.eventDate).format('h:mm:ss a') }</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="not-found text-center py-5">
                <h3>404 - Not Found</h3>
                <p className="my-3">We could not find the event you seek</p>
              </div>
            ) }

            <Join />
            <Footer />
          </Fragment>
      )
    }
  }
}

export default Event
