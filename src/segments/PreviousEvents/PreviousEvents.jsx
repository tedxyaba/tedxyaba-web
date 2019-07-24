import React, { Component } from 'react';
import './PreviousEvents.scss';
import apiClient from '../../services/api-client';
import apiRoutes from '../../utils/routes';
import TransformEventsListData from '../../utils/data-transformers/eventslist';
import moment from 'moment';

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

    console.log('PreviousEvents===> ', this.state)

    return (
      <section id="previous-events" className="previous-events">
        <h3>
          {this.props.title || title }
        </h3>

        <div className="row">
          { previousEvents.map((event, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3" key={index}>
              <div className="card">
                <img src={event.image.url} className="card-img-top" alt={event.image.alt} width="100%" />
                <div className="card-body">
                  <h5 className="card-title">{ event.title }</h5>
                  <p><small className="text-muted">{ moment(event.eventDate).format('Do MMMM YYYY') }</small></p>
                  <p className="card-text">{ event.summary }</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default PreviousEvents
