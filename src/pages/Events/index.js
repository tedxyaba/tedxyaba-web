import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RecentEvents from '../../components/RecentEvents';
import Section from '../../components/layout/Section';
import Button from '../../components/Button';
import withScrollToTop from '../withScrollToTop';
import SearchAndFilters from '../../components/SearchAndFilters';
import moment from 'moment';
import { eventBg1 } from '../../utils/images';

const Events = ({ loading, events }) => {
  return (
    <div className="events">
      { loading ? null : (
        <>
        <RecentEvents events={events} />

        <SearchAndFilters data={events} searchPlaceholder="Search events..." />

        <Section className="event-list">
          <div className="row">
            { events.map(event => (
              <div key={event.id} className="event col-md-4">
                <Link to={`/events/${event.slug}`} className="event-link">
                  <div className="event-content-wrapper" style={{backgroundImage: `url(${event.theme_banner ? event.theme_banner : eventBg1})`}}>
                    <div className="event-content">
                      <p className="e-date">{moment(event.datetime).format("Do MMMM YYYY")}</p>
                      <p className="e-title">{event.title}</p>
                      <p className="e-category">{event.category}</p>
                    </div>
                    <div className="overlay" />
                  </div>
                </Link>
              </div>
            )) }
          </div>
        </Section>
        </>
      )}
    </div>
  )
};

const mapStateToProps = ({ loadingBar, events }) => {
  return {
    loading: loadingBar.default > 0,
    events: events.sort((a, b) => {
      if (moment(a.datetime).isAfter(b.datetime)) return -1
      if (moment(a.datetime).isBefore(b.datetime)) return 1
      return 0;
    })
  }
}

export default withScrollToTop(connect(mapStateToProps)(Events));
