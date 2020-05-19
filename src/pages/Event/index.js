import React, { useEffect, useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Section from '../../components/layout/Section';
import Button from '../../components/Button';
import moment from 'moment-timezone';
import { LaraNg, gCalendar, gMapPin, shareIcon, eventBg1 } from '../../utils/images';
import SocialIcons from '../../components/SocialIcons';
import withScrollToTop from '../withScrollToTop';
import { withRouter } from 'react-router-dom';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetchApi from '../../utils/fetch-api';
import { BackgroundX } from '../../utils/images';
import PersonModal from '../../components/Modals/PersonModal';
import PartnersModal from '../../components/Modals/PartnersModal';

const Event = ({ eventFromStore, socials, loadingBar, dispatch }) => {
  const [event, setEvent] = useState({});
  const [speaker, setSpeaker] = useState({});
  const [partner, setPartner] = useState({});

  useEffect(() => {
    if (eventFromStore && eventFromStore.id) {
      async function fetchEvent () {
        dispatch(showLoading());

        try {
          const response = await fetchApi.getData(`/events/${eventFromStore.id}`)
          const data = await response.json();
          setEvent(data);
          dispatch(hideLoading());
        } catch (error) {
          dispatch(hideLoading());
          console.log('Error fetching event with id:', eventFromStore.id)
        }
      }
      fetchEvent()
    }
  }, [eventFromStore])

  const openGoogleMap = venue => {
    const formatVenue = venue.replace(/\s/g, '+');
    const url = `https://www.google.com/maps/place/${formatVenue}`;

    window.open(url, '_blank')
  };

  if (!Object.keys(event).length && loadingBar.default === 0) {
    return (
      <Section className="event text-center">
        <p className="loading-text">Nothing To See Here</p>
      </Section>
    )
  }

  if (!Object.keys(event).length || loadingBar.default > 0) {
    return (
      <Section className="event text-center">
        <p className="loading-text">Loading...</p>
      </Section>
    )
  }

  return (
    <div className="event">
      <Section className="header-section">
        <div className="row">
          <div className="col-12">
            <div className="details-wrapper" style={{backgroundImage: `url(${event.theme_banner ? event.theme_banner : eventBg1})`}}>
              {/* <div className="overlay" /> */}
              <div className="details">
                <p className="event-category">{event.category}</p>
                <p className="event-title">{event.title}</p>
                <p className="event-datetime">{moment.tz(event.datetime, 'Africa/Lagos').format("D MMMM YYYY, h:mm A z")}</p>
              </div>
              <div className="left-x"><BackgroundX /></div>
              <div className="right-x"><BackgroundX /></div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="event-section-one">
        <div className="row">
          <div className="col-md-7">
            <div className="e-description">
              <p className="e-page-title">ABOUT THIS EVENT</p>
              <p className="event-description multiline-text">{event.description}</p>
            </div>

            { event.talks.length > 0 && (
              <div className="e-speakers">
                <p className="e-page-title">SPEAKERS</p>

                <div className="speakers-list">
                  { event.talks.map(talk => (
                    <div key={talk.id} className="speaker-details" onClick={() => setSpeaker(talk)} data-toggle="modal" data-target="#eventSpeakerProfile">
                      <div className="speaker-image" style={{backgroundImage: `url(${talk.image_url ? talk.image_url : ''})`}} />
                      <p className="speaker-name">{talk.speaker_name}</p>
                    </div>
                  ))}
                </div>

                <PersonModal
                  id="eventSpeakerProfile"
                  person={{
                    image_url: speaker.image_url,
                    name: speaker.speaker_name,
                    linkedin_url: speaker.speaker_linkedin_url,
                    twitter_handle: speaker.speaker_twitter_handle,
                    bio: speaker.speaker_bio
                  }}
                />
              </div>
            ) }

            { event.partners.length > 0 && (
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

                <PartnersModal
                  id="eventPartnersSponsors"
                  data={{
                    image_url: partner.logo_url,
                    url: partner.website || 'https://andela.com',
                    bio: partner.bio
                  }}
                />
              </div>
            ) }
          </div>

          <div className="col-md-1" />
          
          <div className="col-md-4">
            <div className="e-date-time">
              <p className="e-page-title">Date And Time</p>
              <p className="event-date">{moment(event.datetime).format('ddd, D MMMM, YYYY')}</p>
              <p className="event-time">{moment.tz(event.datetime, 'Africa/Lagos').format('h:mm a z')}</p>

              <Button
                type="button-icon"
                text="Add to Calendar"
                onClick={() => console.log('Add to calendar')}
                btnType="calendar"
                icon={<img src={gCalendar} alt="" className="icon" />}
              />
            </div>

            <div className="e-date-location">
              <p className="e-page-title">LOCATION</p>
              <p className="event-location">{event.venue}</p>

              <Button
                type="button-icon"
                text="View Map"
                onClick={() => openGoogleMap(event.venue)}
                btnType="map"
                icon={<img src={gMapPin} alt="" className="icon" />}
              />

              <div className="my-3 use-lara">
                <LaraNg /> <a href="https://lara.ng/" target="_blank" rel="noopener noreferrer">Use Lara.ng</a>
              </div>
            </div>

            <div className="e-share">
              <p className="e-page-title">SHARE WITH FRIENDS</p>
              <div className="icons">
                <SocialIcons data={socials} size={2} />
                <img src={shareIcon} alt="" className="share" />
              </div>
            </div>

            <div className="e-title">
              
              <Button
                type="link"
                text="Register"
                linkTo="/"
                btnType="primary"
                className="mt-5"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
};

const mapStateToProps = ({ events, socials, loadingBar }, { match }) => {
  const { slug } = match.params;

  return {
    eventFromStore: events.find(e => e.slug === slug),
    socials,
    loadingBar,
  }
}

export default withScrollToTop(withRouter(connect(mapStateToProps)(Event)));
