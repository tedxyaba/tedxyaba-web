import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import RecentEvents from '../../components/RecentEvents';
import Section from '../../components/layout/Section';
import Button from '../../components/Button';
import withScrollToTop from '../withScrollToTop';

const Events = ({ loading, events }) => {
  return (
    <div className="events">
      { loading ? null : (
        <>
        <RecentEvents events={events} />

        {/* <Section className="event-section-one row">
        </Section> */}
        </>
      )}
    </div>
  )
};

const mapStateToProps = ({ loadingBar, events }) => {

  return {
    loading: loadingBar.default > 0,
    events
  }
}

export default withScrollToTop(connect(mapStateToProps)(Events));
