import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Section from '../../components/layout/Section';
import withScrollToTop from '../withScrollToTop';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetchApi from '../../utils/fetch-api';
import Loading from '../../components/Loading';

// <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScpKrMTWwJKTnyjxUF5zA9CmezwKqolRZVuxIDSkmnKIR54yA/viewform?embedded=true" width="640" height="1498" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

const Register = ({ futureEvents, loadingBar, dispatch }) => {
  const [futureEvent, setFutureEvent] = useState({});

  // useEffect(() => {
  //   if (futureEvents[0]) {
  //     async function fetchFutureEvent () {
  //       dispatch(showLoading());

  //       try {
  //         const response = await fetchApi.getData(`/events/${futureEvents[0].id}`)
  //         const data = await response.json();
  //         setFutureEvent(data);
  //         dispatch(hideLoading());
  //       } catch (error) {
  //         dispatch(hideLoading());
  //         console.log('Error fetching future event for register with id:', futureEvents[0].id)
  //       }
  //     }
  //     fetchFutureEvent()
  //   }
  // }, []);

  if (loadingBar.default > 0) {
    return (
      <Loading />
    )
  }

  if (loadingBar.default === 0 && !Object.keys(futureEvent).length) {
    return (
      <Section className="text-center">
        <p className="loading-text">No Upcoming Events</p>
      </Section>
    )
  }

  return (
    <div>register</div>
  )
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
