import React, { useState, useEffect } from 'react';
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
import Paginate from '../../components/Paginate';
import { EVENTS_PER_PAGE } from '../../utils/configs';
import { handleSearchAndFilterEvents, setCurrentPage, handleMoreEvents } from '../../actions/events';

const Events = ({ loading, eventsData, dispatch }) => {
  const [events, setEvents] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  const [initialScrollTo, setInitialScrollTo] = useState(0);

  useEffect(() => {
    setEvents(sortEvents(eventsData[eventsData.current_page]))
  }, [eventsData])

  const sortEvents = (events) => {
    return events && events.sort((a, b) => {
      if (moment(a.datetime).isAfter(b.datetime)) return -1
      if (moment(a.datetime).isBefore(b.datetime)) return 1
      return 0;
    })
  }

  const scrollToTop = (page) => {
    const headerId = document.getElementById('events-page-header');
    let scrollToPoint = 0;

    if (initialScrollTo === 0 && page === 1) {
      setInitialScrollTo(null)
      scrollToPoint = 0
    } else {
      scrollToPoint = headerId.scrollHeight
    }

    document.body.scrollTop = scrollToPoint; // For Safari
    document.documentElement.scrollTop = scrollToPoint; // For Chrome, Firefox, IE and Opera
  }

  const onEventsPaginate = (page) => {
    scrollToTop(page)

    if (eventsData[page]) {
      dispatch(setCurrentPage(page))
    } else {
      dispatch(handleMoreEvents(page, filterParams))
    }
  }

  const filterEvents = (params) => {
    setFilterParams(params);
    dispatch(handleSearchAndFilterEvents(params))
  };

  return (
    <div className="events">
      { loading ? <Loading /> : (
        <>
        <RecentEvents events={sortEvents(eventsData.recent_events) || []} />

        <SearchAndFilters
          type="events"
          onFilter={filterEvents}
          searchPlaceholder="Search events..."
        />

        <Section className="event-list">
          <div className="row">
          {eventsData.loading && (
            <div className="col-md-12 loading-dots mb-3">
              <div className="dot-carousel" />
            </div>
          )}

          { events.length === 0 && (
            <div className="col-md-12 no-results">
              <p>No events found for your filters criteria.</p>
            </div>
          ) }

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

            { events.length > 0 && (
              <div className="col-12 mt-5">
                <Paginate
                  total={eventsData.total_count || 0}
                  currentPage={eventsData.current_page || 0}
                  perPage={EVENTS_PER_PAGE}
                  onPageChange={onEventsPaginate}
                  loading={eventsData.loading}
                />
              </div>
            )}
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
    eventsData: events
  }
}

export default withScrollToTop(connect(mapStateToProps)(Events));
