import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PreviousEvents.scss';
import apiClient from '../../services/api-client';
import apiRoutes from '../../utils/routes';
import TransformEventsListData from '../../utils/data-transformers/eventslist';
import moment from 'moment';
import Section from '../../pages/components/ui/Section';

class PreviousEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Previous Events',
      loading: true,
      previousEvents: [],
      errors: null,
    }

    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    const route = apiRoutes.documentByTag('landing page')

    apiClient.get(route, (success, data) => {
      if (success) {
        this.setState({
          loading: false,
          previousEvents: TransformEventsListData(data)
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
    const { title, previousEvents } = this.state;

    return (
      <Section title={this.props.title || title} classNames="previous-events">
        <div className="row">
          { previousEvents.map((event, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3" key={index}>
              <Link to={`/events/${event.id}`}>
                <div className="card">
                  <img src={event.image.thumbnail_list_url} className="card-img-top" alt={event.image.alt} />
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{ event.title }</h5>
                    <p><span className="badge badge-pill badge-light">{event.event_type}</span></p>
                    <p><small className="text-muted">{ moment(event.eventDate).format('Do MMMM YYYY') }</small></p>
                    <p className="card-text text-truncate">{ event.summary }</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Section>
    )
  }
}

export default PreviousEvents
