import React, { Component } from 'react';

class NextEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      title: 'Upcoming Event',
      loading: false,
      event: [],
      errors: null
    }

    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    // landingPage.get((success, data) => {
    //   const { results } = data;

    //   if (success) {
    //     this.setState({
    //       loading: false,
    //       event: results
    //     })
    //   } else {
    //     this.setState({
    //       loading: false,
    //       errors: data
    //     })
    //   }
    // })
  }

  render() {
    const { title, position } = this.state;

    return (
      <section id={`next-event-${this.props.position || position}`}>
        <h3>
          {this.props.title || title }
        </h3>

        <div className="details row">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>
      </section>
    )
  }
}

export default NextEvent
