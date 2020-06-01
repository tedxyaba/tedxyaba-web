import React, { useEffect, useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Section from '../../components/layout/Section';
import Button from '../../components/Button';
import moment from 'moment-timezone';
import { LaraNg, gCalendar, gMapPin, shareIcon, eventBg1, YoutubeLogo } from '../../utils/images';
import SocialIcons from '../../components/SocialIcons';
import withScrollToTop from '../withScrollToTop';
import { withRouter } from 'react-router-dom';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetchApi from '../../utils/fetch-api';
import { BackgroundX } from '../../utils/images';
import PersonModal from '../../components/Modals/PersonModal';
import PartnersModal from '../../components/Modals/PartnersModal';
import { YoutubeThumbnail } from '../../components/YoutubeEmbed';
import Loading from '../../components/Loading';

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
  }, [eventFromStore, dispatch]);

  const isNext = () => {
    const formattedDate = moment(event.datetime).format('YYYY-MM-DD');
    const sameOrAfter = moment(formattedDate).isSameOrAfter(moment().format('YYYY-MM-DD'))
    
    if (sameOrAfter && event.registration_link) return true;
    return false;
  }

  const openGoogleMap = venue => {
    const formatVenue = venue.replace(/\s/g, '+');
    const url = `https://www.google.com/maps/place/${formatVenue}`;

    window.open(url, '_blank')
  };

  if (loadingBar.default === 0 && !Object.keys(event).length) {
    return (
      <Section className="event text-center">
        <p className="loading-text">Nothing To See Here</p>
      </Section>
    )
  }

  if (loadingBar.default > 0 || !Object.keys(event).length) {
    return (
      <Loading />
    )
  }

  return (
    <div className="event">
      <Section className="header-section">
        <div className="row">
          <div className="col-12">
            <div className="details-wrapper" style={{backgroundImage: `url(${event.theme_banner ? event.theme_banner : eventBg1})`}}>
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

      <section className="header-mobile-section">
        <div className="details-wrapper" style={{backgroundImage: `url(${event.theme_banner ? event.theme_banner : eventBg1})`}}>
          <div className="overlay" />
          <div className="details">
            <p className="event-category">{event.category}</p>
            <p className="event-title">{event.title}</p>
            <p className="event-datetime">{moment.tz(event.datetime, 'Africa/Lagos').format("D MMMM YYYY, h:mm A z")}</p>
          </div>
          <div className="right-x"><BackgroundX /></div>
        </div>
      </section>

      <Section className="event-cta">
        <div className="cta-row">
          <div className="cta-title">
            <p className="cta-date">{moment.tz(event.datetime, 'Africa/Lagos').format("D MMMM YYYY • h:mm A z")}</p>
            <p className="cta-title-text">{event.category}: {event.title}</p>
          </div>

          <div className="cta-button">
            { isNext() ? (
              <Button
                type="link-external"
                text="Register"
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                btnType="primary"
              />
            ) : (
              <Button
                type="default"
                text="Sold Out"
                btnType="default"
              />
            ) }
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

            { event.speakers.length > 0 && (
              <div className="e-speakers">
                <p className="e-page-title">SPEAKERS</p>

                <div className="speakers-list">
                  { event.speakers.map(speaker => (
                    <div key={speaker.id} className="speaker-details" onClick={() => setSpeaker(speaker)} data-toggle="modal" data-target="#eventSpeakerProfile">
                      <div className="speaker-image" style={{backgroundImage: `url(${speaker.image_url ? speaker.image_url : ''})`}} />
                      <p className="speaker-name">{speaker.speaker_name}</p>
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

            { isNext() || (event.talks.length > 0 && (
              <div className="e-event-talks">
                <p className="e-page-title">TALKS FROM THIS EVENT</p>

                <div className="event-talks-list row">
                  { event.talks.map(talk => (
                    <a href={talk.video_url} target="_blank" rel="noopener noreferrer" key={talk.id} className="col-lg-6">
                      <div className="talk-item">
                        <div className="top-bar">
                          <YoutubeLogo />
                          <div>{talk.video_duration && talk.video_duration.match(/\d+/g).join(':')}</div>
                        </div>

                        <YoutubeThumbnail url={talk.video_url} />

                        <div className="overlay">
                          <p className="name-date">
                            {talk.speaker_name}
                            { talk.date && <span className="date-year"> - {moment(talk.date).year()}</span> }
                          </p>
                          <p className="topic">{talk.topic}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )) }

            { isNext() && event.partners.length > 0 && (
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
                    url: partner.partner_link,
                    bio: partner.partner_bio
                  }}
                />
              </div>
            ) }
          </div>

          <div className="col-md-1" />
          
          <div className="col-md-4">
            { isNext() && (
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
            ) }

            <div className="e-location">
              <p className="e-page-title">LOCATION</p>
              <p className="event-location">{event.venue}</p>

              { (isNext() && event.venue && event.venue.toLowerCase() !== 'virtual' ) && (
                <>
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
                </>
              )}
            </div>

            { isNext() || (event.partners.length > 0 && (
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
                    url: partner.partner_link,
                    bio: partner.partner_bio
                  }}
                />
              </div>
            )) }

            <div className="e-share">
              <p className="e-page-title">SHARE WITH FRIENDS</p>
              <div className="icons">
                <SocialIcons data={socials} size={2} />
                <img src={shareIcon} alt="" className="share" />
              </div>
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
