import React, { Component, Fragment } from 'react';
import './Event.scss';
import apiClient from '../../services/api-client';
import apiRoutes from "../../utils/routes";
import Loading from "../../components/loading";
import TransformEventsListData from '../../utils/data-transformers/eventslist';
import Join from '../../segments/Join';
import Footer from '../../segments/Footer';
import moment from 'moment';
// import Icon from 'react-web-vector-icons';
import Button from '../../components/ui/Button';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Event extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventId: '',
      loading: true,
      event: {},
      errors: null,

      windowWidth: 0,
      isMobile: false
    }

    this._fetchData = this._fetchData.bind(this);
    this.setViewport = this.setViewport.bind(this);
    this.varySpeakerSlidesCount = this.varySpeakerSlidesCount.bind(this);
    this.varySponsorsSlidesCount = this.varySponsorsSlidesCount.bind(this);
  }

  componentDidMount() {
    this.setViewport();
    window.addEventListener('resize', this.setViewport);

    if (this.props.match.params.eventId) {
      this.setState({
        eventId: this.props.match.params.eventId
      })

      this._fetchData(this.props.match.params.eventId);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setViewport)
  }

  setViewport() {
    if (window !== 'undefined') {
      this.setState({
        windowWidth: window.innerWidth,
        isMobile: window.innerWidth < 768
      })
    }
  }

  varySpeakerSlidesCount() {
    if (this.state.windowWidth <= 528) return 1
    if (this.state.windowWidth <= 768) return 2
    if (this.state.windowWidth <= 1024) return 3
    if (this.state.windowWidth <= 1440) return 4
    if (this.state.windowWidth > 1440) return 5
  }

  varySponsorsSlidesCount() {
    if (this.state.windowWidth <= 528) return 2
    if (this.state.windowWidth <= 768) return 3
    if (this.state.windowWidth <= 1024) return 4
    if (this.state.windowWidth <= 1440) return 5
    if (this.state.windowWidth > 1440) return 6
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
    const speakersSlideSettings = {
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: this.varySpeakerSlidesCount(),
      slidesToScroll: 1
    };
    const sponsorsSlideSettings = {
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: this.varySponsorsSlidesCount(),
      slidesToScroll: 1
    }

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
                    // backgroundImage: `url(${event.image.url})`,
                    backgroundImage: `linear-gradient(to bottom right, rgba(230,43,31,0.6), rgba(230,43,31,0.1)),url(${event.image.url})`
                  }}>
                  <div className="overlay">
                    <div className="banner-content">
                      <h3>{event.title}</h3>
                      <p className="date">{ moment(event.eventDate).format('Do MMMM YYYY') }</p>
                    </div>
                  </div>
                </div>

                <div className="container event-content">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-7 text-center">
                      <p><span className="badge badge-pill badge-light">{event.event_type}</span></p>

                      <p className="summary text-justify">{ event.summary }</p>

                      <div className="description text-justify">
                        { event.description.map((d, i) => (
                          <p key={i}>{ d }</p>
                        )) }
                      </div>

                      <p>at</p>

                      <div className="venue">
                        <p>{event.event_venue}</p>
                      </div>

                      <div className="date-time">
                        <p>Date and Time</p>
                        <p className="event-date text-muted">
                          { moment(event.eventDate).format('Do MMMM YYYY') }, { moment(event.eventDate).format('h:mm a') }
                        </p>
                      </div>

                      <div className="event-cta">
                        <Button
                          type="link"
                          text={event.link_to_register.url ? "Register Now" : "Registration Closed"}
                          btnType={event.link_to_register.url ? "register" : "default"}
                          classNames="mr-2"
                          href={event.link_to_register.url}
                          target={event.link_to_register.target}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pb-3">
                    { !!event.speakers.length && (
                      <div className="sub-section speakers-slides">
                        <h5 className="sub-section-title">Speakers</h5>
                        <hr />

                        <Slider {...speakersSlideSettings}>
                          { event.speakers.map((speaker, index) => (
                            <div className="px-3" key={index}>
                              <div className="card">
                                <img src={speaker.image.url} className="card-img-top" alt={speaker.name} />
                                <div className="card-body">
                                  <h6 className="card-title">
                                    <a href={speaker.linkToBio.url} target={speaker.linkToBio.target} className="card-link">{ speaker.name }</a>
                                  </h6>
                                  <small className="text-muted">{ speaker.title }</small>
                                </div>
                              </div>
                            </div>
                          )) }
                        </Slider>
                      </div>
                    )}

                    { !!event.sponsors.length && (
                      <div className="sub-section sponsors-list">
                        <h5 className="sub-section-title">Event Sponsors</h5>
                        <hr />

                        <Slider {...sponsorsSlideSettings}>
                          { event.sponsors.map((sponsor, index) => (
                            <div className="sponsor-image" key={index}>
                              <a href={sponsor.linkToBio.url} target="_blank" rel="noopener noreferrer">
                                <img src={sponsor.image.url} alt={sponsor.name} width={sponsor.image.width} />
                              </a>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    )}
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
