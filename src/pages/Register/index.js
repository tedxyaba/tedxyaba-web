import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Section from '../../components/layout/Section';
import withScrollToTop from '../withScrollToTop';
import Loading from '../../components/Loading';

const Register = ({ eventFromStore, futureEvents, loadingBar }) => {
  const [loadingForm, setLoadingForm] = useState(true);
  let event = futureEvents[0];

  if (eventFromStore && isFutureEvent(eventFromStore)) {
    event = eventFromStore;
  }

  const formLoaded = () => {
    setLoadingForm(false);
  }

  if (loadingBar.default > 0) {
    return (
      <Loading />
    )
  }

  if (event && Object.keys(event).length > 0) {
    return (
      <>
      { loadingForm && <div className="my-2 text-center">
        Please wait...
      </div> }

      <iframe
        title={event.title}
        src={event.registration_link}
        width="100%"
        height="1000"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        onLoad={formLoaded}>
      </iframe>
      </>
    )
  } else {
    return (
      <Section className="text-center">
        <>
        <p className="loading-text">Registration Closed</p>
        <p><Link to='/'>Watch Inspiring Talks</Link></p>
        </>
      </Section>
    )
  }
};

const isFutureEvent = (event) => {
  const formattedDate = moment(event.datetime).format('YYYY-MM-DD');
  const sameOrAfter = moment(formattedDate).isSameOrAfter(moment().format('YYYY-MM-DD'));
  return sameOrAfter
};

const mapStateToProps = ({ events, loadingBar }, {match}) => {
  const futureEvents = events.filter(event => isFutureEvent(event));
  const { slug } = match.params;

  return {
    eventFromStore: events.find(e => e.slug === slug),
    futureEvents,
    loadingBar,
  }
};

export default withScrollToTop(
  withRouter(
    connect(
      mapStateToProps)(Register)));
