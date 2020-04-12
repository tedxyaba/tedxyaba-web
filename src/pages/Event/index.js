import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Section from '../../components/layout/Section';
import Button from '../../components/Button';
import moment from 'moment';
import { LaraNg, gCalendar, gMapPin, shareIcon } from '../../utils/images';
import SocialIcons from '../../components/SocialIcons';

const Event = ({ event, socials, loadingBar }) => {
  const openGoogleMap = venue => {
    const formatVenue = venue.replace(/\s/g, '+');
    const url = `https://www.google.com/maps/place/${formatVenue}`;

    window.open(url, '_blank')
  };

  if (!event || loadingBar.default > 0) {
    return (
      <Section className="event text-center">
        <p className="loading-text">Loading...</p>
      </Section>
    )
  }

  return (
    <div className="event container-fluid">
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

      <Section className="row-divider">
        <hr />
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
  const { id } = match.params;

  return {
    event: events.find(e => e.id == id),
    socials,
    loadingBar,
  }
}

export default connect(mapStateToProps)(Event);
