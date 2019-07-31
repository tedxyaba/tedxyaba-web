import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NextEvent.scss';
import apiClient from '../../services/api-client';
import apiRoutes from '../../utils/routes';
import TransformEventsListData from '../../utils/data-transformers/eventslist';
import moment from 'moment';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Section from '../../pages/components/ui/Section';
import Button from '../../pages/components/ui/Button';

class NextEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Upcoming Event',
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

    if (this.props.event) {
      this._fetchData(this.props.event)
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

  _fetchData(event) {
    const eventRoute = apiRoutes.documentById(event.id);

    apiClient.get(eventRoute, (success, data) => {
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
    })
  }

  render() {
    const { title, event, isMobile } = this.state;
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

    return (
      !!Object.keys(event).length && (
        <Section title={this.props.title || title } classNames="next-event">
          <div>
            <div className="details row">
              <div className={`col-12 col-md-6 order-2 order-md-1 ${isMobile ? 'text-center' : ''} p-5`}>
                <h3>
                  <Link to={`/events/${event.id}`}>{ event.title }</Link>
                </h3>
                <p>{ event.summary }</p>

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

                <div className="event-cta">
                  <Button
                    type="link"
                    text="Register Now"
                    btnType="register"
                    classNames="mr-2"
                    href={event.link_to_register.url || "https://www.google.com"}
                    target={event.link_to_register.target}
                  />
                  <Button
                    type="link-internal"
                    text="Learn More"
                    btnType="link"
                    className=""
                    linkTo={`/events/${event.id}`}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 order-1 order-md-2">
                <img src={event.image.url} alt={event.image.alt} width="100%" />
              </div>
            </div>

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
        </Section>
      )
    )
  }
}

export default NextEvent
