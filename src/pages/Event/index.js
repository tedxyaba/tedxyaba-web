import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import SelectDropdown from '../../components/SelectDropdown';
import Section from '../../components/layout/Section';
import Button from '../../components/Button';
import Icon from 'react-web-vector-icons';
import moment from 'moment';

const Event = ({ event }) => {
  return (
    <div className="event container-fluid">
      <Section className="event-section-one row">
        <div className="col-md-8">
          <div className="e-title-cat">
            <p className="event-title">{event.title}</p>
            <p className="event-category">{event.category}</p>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="e-date">
            <p>{moment(event.event_date).format('MMM')}</p>
            <p>{moment(event.event_date).format('DD')}</p>
          </div>

          <div className="e-title">
            <h3>{event.title}</h3>
            <div>
              <span>FREE</span>
              <span>TEDxYaba</span>
              <span>{event.category}</span>
            </div>

            <Button
              type="link"
              text="Register"
              linkTo="/"
              btnType="primary"
            />
          </div>
        </div>
      </Section>

      <Section className="row-divider">
        <hr />
      </Section>

      <Section className="event-section-two row">
        <div className="col-md-8">
          <div className="e-description">
            <p>DESCRIPTION</p>
            <p className="event-description multiline-text">{event.description}</p>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="e-date-location">
            <p>DATE AND TIME</p>
            <p className="event-date">{moment(event.event_date).format('ddd, MMMM D, YYYY')}</p>
            <p className="event-time">{event.event_time}</p>
          </div>
        </div>
      </Section>
    </div>
  )
};

const mapStateToProps = ({ events }, { match }) => {
  return {
    event: events.find(e => e.id === match.params.id),
  }
}

export default connect(mapStateToProps)(Event);
