import './Event.scss';
import apiClient from '../../services/api-client';
import apiRoutes from "../../utils/routes";
import Loading from "../../components/loading";
import React, { Component } from 'react';
import TransformEventsListData from '../../utils/data-transformers/eventslist';

class Event extends Component {
  constructor(props) {
    console.log('props: ', props)
    super(props)

    this.state = {
      eventId: props.match.params.eventId,
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
    const { eventId } = this.state;
    const eventRoute = apiRoutes.documentById(eventId);
    const cb = (success, data) => {
      if (success) {
        this.setState({
          loading: false,
          data: TransformEventsListData(data)[0]
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
    const { loading, data } = this.state;

    return (
      <div className="container-fluid">
        { loading ? (
          <Loading />
        ) : (
          <div>
            { data.title }
          </div>
        ) }
      </div>
    )
  }
}

export default Event
