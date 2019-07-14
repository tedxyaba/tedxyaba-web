import React, { Component } from 'react';
import './NextEvent.scss';
import apiClient from '../../services/api-client';
import apiRoutes from '../../utils/routes';
import TransformEventData from '../../utils/data-transformers/events';
import moment from 'moment';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// dummy image of speakers
import Img1 from '../../assets/images/SpeakerImages/Adeola Ade Ojo.jpg'
import Img2 from '../../assets/images/SpeakerImages/Adewale Ajadi.jpg'
import Img3 from '../../assets/images/SpeakerImages/Christian Nwamba.jpg'
import Img4 from '../../assets/images/SpeakerImages/Cobhams Asuquo.jpg'
import Img5 from '../../assets/images/SpeakerImages/Dr Ola Brown.jpg'
import Img6 from '../../assets/images/SpeakerImages/Mike Asukwo.jpg'
import Img7 from '../../assets/images/SpeakerImages/Prince Feyisetan Are.jpg'
import Img8 from '../../assets/images/SpeakerImages/Segun Awosanya.jpg'

class NextEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Upcoming Event',
      loading: true,
      event: {},
      errors: null
    }

    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    if (this.props.event) {
      this._fetchData(this.props.event)
    }
  }

  _fetchData(event) {
    const eventRoute = apiRoutes.documentById(event.id);

    apiClient.get(eventRoute, (success, data) => {
      if (success) {
        this.setState({
          loading: false,
          event: TransformEventData(data)
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
    const { title, event } = this.state;
    const speakers = event.speakers && event.speakers.concat(dummySpeakers);
    const settings = {
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1
    };

    console.log('NXTEVENT===> ', this.state)

    return (
      <section id="next-event" className="next-event">
        <h3>
          {this.props.title || title }
        </h3>

        { !!Object.keys(event).length && (
          <div>
            <div className="details row">
              <div className="col-6">
                <h3>{ event.title }</h3>
                <p>{ event.summary }</p>

                <div>
                  <p className="event-date">{ moment(event.eventDate).format('Do MMMM YYYY') }</p>
                  <p className="event-date">{ moment(event.eventDate).format('h:mm:ss a') }</p>
                </div>

                <div className="event-cta">
                  <button className="btn btn-primary mr-3">Register</button>
                  <button className="btn btn-light">Read More</button>
                </div>

                {/* { event.description.map((d, i) => (
                  <p key={i}>{ d }</p>
                )) } */}
              </div>

              <div className="col-6">
                <img src={event.image.url} alt={event.image.alt} />
              </div>
            </div>

            <div className="speakers-slides">
              <Slider {...settings}>
                { speakers.map((speaker, index) => (
                  <div className="px-3" key={index}>
                    <div className="card">
                      <img src={speaker.image} className="card-img-top" alt={speaker.name} />
                      <div className="card-body">
                        <h6 className="card-title">
                          <a href="/" className="card-link">- speaker name -</a>
                        </h6>
                        <small className="text-muted">- speaker title -</small>
                      </div>
                    </div>
                  </div>
                )) }
              </Slider>
            </div>

            <div className="sponsors-list">
              Horizontal list of sponsors
            </div>
          </div>
        ) }
      </section>
    )
  }
}

const dummySpeakers = [
  {
    name: 'Adeola Ade Ojo',
    title: '',
    image: Img1,
    linkToBio: ''
  },
  {
    name: 'Adewale Ajadi',
    title: 'Country Director, Synergos Nigeria',
    image: Img2,
    linkToBio: ''
  },
  {
    name: 'Christian Nwamba',
    title: 'Developer Advocate at Cloudinary',
    image: Img3,
    linkToBio: ''
  },
  {
    name: 'Cobhams Asuquo',
    title: 'Musician, Songwriter & Producer',
    image: Img4,
    linkToBio: ''
  },
  {
    name: 'Dr Ola Brown',
    title: 'Founder, Flying Doctors Nigeria',
    image: Img5,
    linkToBio: ''
  },
  {
    name: 'Mike Asukwo',
    title: 'Chief Editorial Artist, BusinessDay Media',
    image: Img6,
    linkToBio: ''
  },
  {
    name: 'Prince Feyisetan Are',
    title: 'Head Coach, Para Powerlifting in Nigeria',
    image: Img7,
    linkToBio: ''
  },
  {
    name: 'Segun Awosanya',
    title: 'Realtor, Civil Rights & Institutional Reforms Advocate',
    image: Img8,
    linkToBio: ''
  }
]

export default NextEvent
