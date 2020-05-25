import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RecentEvents from '../../components/RecentEvents';
import Section from '../../components/layout/Section';
import withScrollToTop from '../withScrollToTop';
import SearchAndFilters from '../../components/SearchAndFilters';
import moment from 'moment';
import { eventBg1 } from '../../utils/images';
import Loading from '../../components/Loading';

const Events = ({ loading, events }) => {
  const [filtered, setFiltered] = useState(null);

  const filterArrays = () => {
    if (filtered === null) return events;

    return events.filter(event => {
      return filtered.findIndex(e => e.id === event.id) >= 0;
    })
  };

  return (
    <div className="events">
      { loading ? <Loading /> : (
        <>
        <RecentEvents events={events} />

        <SearchAndFilters
          type="events"
          onFilter={setFiltered}
          searchPlaceholder="Search events..."
        />

        <Section className="event-list">
          <div className="row">
          { (filtered && filtered.length === 0) && (
            <div className="col-md-12 no-results">
              <p>No events found for your filters criteria.</p>
            </div>
          ) }

            { filterArrays().map(event => (
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
