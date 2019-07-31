import React, { Component } from 'react';
import './NextEvent.scss';
import apiClient from '../../services/api-client';
import apiRoutes from '../../utils/routes';
import TransformEventsListData from '../../utils/data-transformers/eventslist';
import moment from 'moment';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Section from '../../pages/components/ui/Section';

// dummy image of sponsors
import Sp1 from '../../assets/images/sponsors/1.jpg'
import Sp2 from '../../assets/images/sponsors/2.jpg'
import Sp3 from '../../assets/images/sponsors/3.jpg'
import Sp4 from '../../assets/images/sponsors/4.jpg'
import Sp5 from '../../assets/images/sponsors/5.jpg'
import Sp6 from '../../assets/images/sponsors/6.jpg'

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
    const sponsors = event.sponsors && event.sponsors.concat(dummySponsors);
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
              <div className={`col-12 col-md-6 order-2 order-md-1 ${isMobile ? 'text-center' : ''}`}>
                <h3>{ event.title }</h3>
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
                  <a href={event.link_to_register.url} target={event.link_to_register.target} className="btn btn-primary mr-3">Register Now</a>
                  <button className="btn btn-light">Read More</button>
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

            { !!sponsors.length && (
              <div className="sub-section sponsors-list">
                <h5 className="sub-section-title">Event Sponsors</h5>
                <hr />

                <Slider {...sponsorsSlideSettings}>
                  { sponsors.map((sponsor, index) => (
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

const dummySponsors = [
  {
    name: '',
    image: {
      url: Sp1,
      alt: 'Sp1',
      width: 100
    },
    linkToBio: 'https://www.google.com'
  },
  {
    name: '',
    image: {
      url: Sp2,
      alt: 'Sp2',
      width: 100
    },
    linkToBio: 'https://www.google.com'
  },
  {
    name: '',
    image: {
      url: Sp3,
      alt: 'Sp3',
      width: 100
    },
    linkToBio: 'https://www.google.com'
  },
  {
    name: '',
    image: {
      url: Sp4,
      alt: 'Sp4',
      width: 100
    },
    linkToBio: 'https://www.google.com'
  },
  {
    name: '',
    image: {
      url: Sp5,
      alt: 'Sp5',
      width: 100
    },
    linkToBio: 'https://www.google.com'
  },
  {
    name: '',
    image: {
      url: Sp6,
      alt: 'Sp6',
      width: 100
    },
    linkToBio: 'https://www.google.com'
  }
]

export default NextEvent
