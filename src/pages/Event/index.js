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

const Event = ({ eventFromStore, socials, loadingBar, dispatch }) => {
  const [event, setEvent] = useState({});

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
    <div className="event container-fluid">
      <Section className="header-section row">
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
      </Section>

      <Section className="event-section-one row">
        <>
        <div className="col-md-8">
          <div className="e-title-cat mb-2">
            <p className="event-title">{event.title}</p>
            <p className="event-category">{event.category}</p>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="e-date">
            <p className="month">{moment(event.datetime).format('MMM')}</p>
            <p className="day">{moment(event.datetime).format('DD')}</p>
          </div>

          <div className="e-title">
            <h3>{event.title}</h3>

            <div className="e-labels">
              <span className="free">FREE</span>
              <span className="tedxy">TEDxYaba</span>
              <span className="categ">{event.category}</span>
            </div>

            <Button
              type="link"
              text="Register"
              linkTo="/"
              btnType="primary"
              className="mt-5"
            />
          </div>
        </div>
        </>
      </Section>

      <Section className="event-section-two row">
        <>
        <div className="col-md-8">
          <div className="e-description">
            <p className="e-page-title">DESCRIPTION</p>
            <p className="event-description multiline-text">{event.description}</p>
          </div>

          <div className="e-share my-5">
            <p className="e-page-title">SHARE WITH FRIENDS</p>
            <div className="icons">
              <SocialIcons data={socials} size={2} />
              <img src={shareIcon} alt="" className="share" />
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="e-date-time">
            <p className="e-page-title">DATE AND TIME</p>
            <p className="event-date">{moment(event.datetime).format('ddd, MMMM D, YYYY')}</p>
            <p className="event-time">{moment(event.datetime).format('h:mm a')}</p>

            <Button
              type="button-icon"
              text="Add to Calendar"
              onClick={() => console.log('Add to calendar')}
              btnType="calendar"
              icon={<img src={gCalendar} alt="" className="icon" />}
            />
          </div>

          <div className="e-date-location mt-5">
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
        </div>
        </>
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
