import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Section from '../../components/layout/Section';
import withScrollToTop from '../withScrollToTop';
import Loading from '../../components/Loading';

// <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScpKrMTWwJKTnyjxUF5zA9CmezwKqolRZVuxIDSkmnKIR54yA/viewform?embedded=true" width="640" height="1498" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

const Register = ({ futureEvents, loadingBar }) => {
  const event = futureEvents[0];

  const somethingCool = () => {
    console.log('form loaded');
    // let iframee = document.getElementsByClassName('freebirdLightBackground');
    // console.log(iframee)
  }

  if (loadingBar.default > 0) {
    return (
      <Loading />
    )
  }

  console.log(futureEvents)

  if (event && Object.keys(event).length > 0) {
    return (
      <iframe
        title={event.title}
        src={event.registration_link}
        width="100%"
        height="500"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        onLoad={somethingCool}>

        Loading…
      </iframe>
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

const mapStateToProps = ({ events, loadingBar }) => {
  const futureEvents = events.filter(event => isFutureEvent(event));

  return {
    futureEvents,
    loadingBar,
  }
};

export default withScrollToTop(connect(mapStateToProps)(Register));
