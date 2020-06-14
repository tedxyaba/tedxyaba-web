import React, { useState, useEffect } from 'react';
import './styles.scss';
import Button from '../Button';
import { BigX, eventBg1 } from '../../utils/images';

const RecentEvents = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState({});
  const [listSettings, setListSettings] = useState({count: 6, col: 'col-md-2'});
  const [width, setWidth] = useState();
  const headerBg = currentEvent && currentEvent.theme_banner ? currentEvent.theme_banner : eventBg1;
  const truncateAt = currentEvent.title && currentEvent.title.length < 25 ? 200 : 100;

  const checkViewport = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    setCurrentEvent(events[0])
    checkViewport()
  }, [events]);

  useEffect(() => {
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  });

  useEffect(() => {
    switch (true) {
      case (width >= 767.98 && width < 1024):
        setListSettings({count: 3, col: 'col-md-4'})
        return;
      case (width >= 1024 && width < 1200):
        setListSettings({count: 4, col: 'col-md-3'})
        return;
      default:
        setListSettings({count: 6, col: 'col-md-2'})
        return;
    }
  }, [width]);

  if (currentEvent && Object.keys(currentEvent).length > 0) {
    return (
      <header className="recent-events container-fluid" style={{backgroundImage: `url(${headerBg})`}}>
        <div className="big-x"><BigX /></div>
        <div className="event-top-overlay" />

        <div className="main">
          <div className="content">
            <p className="main-category">{currentEvent.category || <span>&nbsp;</span>}</p>
            <p className="main-title">{currentEvent.title}</p>
            <p className="main-description">{currentEvent.description.substring(0,truncateAt)}&hellip;</p>

            <Button
              type="link"
              text="Learn More"
              linkTo={`/events/${currentEvent.slug}`}
              btnType="primary"
              className="my-5"
            />
          </div>
        </div>

        <div className="events-list row">
          <div className="list-head col-12">
            <p>Past Events</p>
          </div>

          { events.slice(0,listSettings.count).map(event => (
            <div key={event.id} className={`event-item ${listSettings.col}`} onClick={() => setCurrentEvent(event)}>
              <div className={`event-details ${ (currentEvent && currentEvent.id === event.id) ? 'active' : '' }`}>
                <div className="position-details">
                  <p className="event-title">{event.title}</p>
                  <p className="event-category">{event.category || <span>&nbsp;</span>}</p>
                </div>
              </div>
            </div>
          )) }

          {/* { events.length > 5 && <div className="event-item col-sm-2">
            <Link to="/events">
              <div className="event-details more-events">
                <p>More Events...</p>
              </div>
            </Link>
          </div>} */}
        </div>
      </header>
    )
  } else {
    return null
  }
}

export default RecentEvents;
