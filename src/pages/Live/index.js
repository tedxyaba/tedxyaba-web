import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import Section from '../../components/layout/Section';
import withScrollToTop from '../withScrollToTop';
import Loading from '../../components/Loading';
import { rapeCultureLivePrep, defaultPerson } from '../../utils/images';
import PersonModal from '../../components/Modals/PersonModal';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetchApi from '../../utils/fetch-api';
import PartnersModal from '../../components/Modals/PartnersModal';

const liveStreamLink = 'https://www.youtube.com/embed/XbKBxqNftqQ';

const Live = ({ liveEvent={}, loadingBar, dispatch }) => {
  const [speaker, setSpeaker] = useState({});
  const [event, setEvent] = useState({})
  const [partner, setPartner] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  useEffect(() => {
    const { slug } = liveEvent;

    if (slug) {
      async function fetchEvent () {
        dispatch(showLoading());

        try {
          const response = await fetchApi.getData(`/events/${slug}`)
          const data = await response.json();
          setEvent(data);
          dispatch(hideLoading());
        } catch (error) {
          dispatch(hideLoading());
          console.log('Error fetching live event with slug:', slug)
        }
      }
      fetchEvent()
    }
  }, [liveEvent, dispatch]);

  const checkViewport = () => {
    setIsMobile(window.innerWidth < 767)
  }

  useEffect(() => {
    window.addEventListener('resize', checkViewport)

    return () => {
      window.removeEventListener('resize', checkViewport)
    }
  })

  if (loadingBar.default > 0) {
    return (
      <Loading />
    )
  }

  if (event && Object.keys(event).length > 0) {
    return (
      <div className="live-stream">
        <Section className="streaming">
          <div className="row">
            <div className="col-12">
              <div className="prep-img">
                <img src={rapeCultureLivePrep} alt="live-prep" />
              </div>

              {/* <div className="youtube-stream">
                <iframe
                  title={event.title}
                  width="100%"
                  height={isMobile ? 400 : 700}
                  src={liveStreamLink}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div> */}
            </div>

            <div className="col-12 summary">
              <p className="e-category">{event.category}</p>
              <p className="e-title">{ event.title }</p>
              <p className="e-datetime">{moment.tz(event.datetime, 'Africa/Lagos').format("D MMMM YYYY, h:mm A z")}</p>
            </div>
          </div>
        </Section>

        <Section className="py-0">
          { event.speakers.length > 0 && (
            <div className="e-speakers">
              <p className="e-page-title">SPEAKERS</p>

              <div className="speakers-list">
                { event.speakers.map(speaker => (
                  <div key={speaker.id} className="speaker-details" onClick={() => setSpeaker(speaker)} data-toggle="modal" data-target="#eventSpeakerProfile">
                    <div className="speaker-image" style={{backgroundImage: `url(${speaker.image_url || defaultPerson})`}} />
                    <p className="speaker-name">{speaker.speaker_name}</p>
                  </div>
                ))}
              </div>

              <PersonModal
                id="eventSpeakerProfile"
                person={{
                  image_url: speaker.image_url || defaultPerson,
                  name: speaker.speaker_name,
                  linkedin_url: speaker.speaker_linkedin_url,
                  twitter_handle: speaker.speaker_twitter_handle,
                  bio: speaker.speaker_bio
                }}
              />
            </div>
          ) }
        </Section>

        <Section className="py-0">
          <div className="e-description">
            <p className="e-page-title">ABOUT THIS EVENT</p>
            <p className="event-description multiline-text">{event.description}</p>
          </div>
        </Section>

        <Section className="py-4">
          { event.partners.length > 0 && (
            <>
            <div className="e-partners">
              <p className="e-page-title">SPONSORS & PARTNERS</p>

              <div className="partners-list">
                { event.partners.map(partner => (
                  <div key={partner.partner_name} className="partner-details" onClick={() => setPartner(partner)} data-toggle="modal" data-target="#eventPartnersSponsors">
                    <div className="partner-image" style={{backgroundImage: `url(${partner.logo_url ? partner.logo_url : ''})`}} />
                    <p className="speaker-name">{partner.partner_name}</p>
                  </div>
                ))}
              </div>
            </div>
            <PartnersModal
              id="eventPartnersSponsors"
              data={{
                image_url: partner.logo_url,
                url: partner.partner_link,
                bio: partner.partner_bio
              }}
            />
            </>
          ) }
        </Section>
      </div>
    )
  } else {
    return (
      <Section className="text-center">
        <>
        <p className="loading-text">Live Stream Closed</p>
        <p>Watch Inspiring <Link to='/'>Talks</Link> from past events</p>
        </>
      </Section>
    )
  }
};

const isFutureEvent = (event) => {
  const formattedDate = moment(event.datetime).format('YYYY-MM-DD');
  const sameOrAfter = moment(formattedDate).isSameOrAfter(moment().format('YYYY-MM-DD'));
  return sameOrAfter && event.registration_link;
};

const mapStateToProps = ({ events, loadingBar }, {match}) => {
  let futureEvents, event;
  const { slug } = match.params;

  if (({ events } = events) && events) {
    futureEvents = events.filter(event => isFutureEvent(event))
    if (slug) {
      event = futureEvents.find(e => e.slug === slug)
    } else {
      event = futureEvents[0]
    }
  }

  return {
    liveEvent: event,
    loadingBar
  }
};

export default withScrollToTop(
  withRouter(
    connect(
      mapStateToProps)(Live)));
