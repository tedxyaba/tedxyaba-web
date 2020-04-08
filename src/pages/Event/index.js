import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Section from '../../components/layout/Section';
import Button from '../../components/Button';
import moment from 'moment';
import { LaraNg, GCalendar, GMapPin } from '../../utils/images';
import SocialIcons from '../../components/SocialIcons';

const Event = ({ event, socials }) => {
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
            <p className="month">{moment(event.event_date).format('MMM')}</p>
            <p className="day">{moment(event.event_date).format('DD')}</p>
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
            <SocialIcons data={socials} size={2} />
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="e-date-time">
            <p className="e-page-title">DATE AND TIME</p>
            <p className="event-date">{moment(event.event_date).format('ddd, MMMM D, YYYY')}</p>
            <p className="event-time">{event.event_time}</p>

            <Button
              type="button-icon"
              text="Add to Calendar"
              onClick={() => console.log('Add to calendar')}
              btnType="calendar"
              icon={<img src={GCalendar} alt="" className="icon" />}
            />
          </div>

          <div className="e-date-location mt-5">
            <p className="e-page-title">LOCATION</p>
            <p className="event-location">{event.event_location}</p>

            <Button
              type="button-icon"
              text="View Map"
              onClick={() => console.log('Add to calendar')}
              btnType="map"
              icon={<img src={GMapPin} alt="" className="icon" />}
            />

            <div className="my-3 use-lara">
              <LaraNg /> <a href="#">Use Lara.ng</a>
            </div>
          </div>
        </div>
        </>
      </Section>
    </div>
  )
};

const mapStateToProps = ({ events, socials }, { match }) => {
  return {
    event: events.find(e => e.id === match.params.id),
    socials,
  }
}

export default connect(mapStateToProps)(Event);
