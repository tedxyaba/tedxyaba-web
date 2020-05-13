import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import HomeEvents from '../../components/HomeEvents';
import Section from '../../components/layout/Section';
import Button from '../../components/Button';
import withScrollToTop from '../withScrollToTop';

const Events = ({ events }) => {
  return (
    <div className="events container-fluid">
      <HomeEvents events={events} />

      <Section className="event-section-one row">
      </Section>

      
    </div>
  )
};

const mapStateToProps = ({ events }) => {

  return {
    events
  }
}

export default withScrollToTop(connect(mapStateToProps)(Events));
