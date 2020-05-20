import React, { useState, useEffect } from 'react';
import './styles.scss';
import Button from '../Button';
import { BigX, eventBg1 } from '../../utils/images';

const RecentEvents = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState({});
  const headerBg = currentEvent && currentEvent.theme_banner ? currentEvent.theme_banner : eventBg1;

  useEffect(() => {
    setCurrentEvent(events[0])
  }, [events]);

  if (currentEvent && Object.keys(currentEvent).length > 0) {
    return (
      <header className="recent-events container-fluid" style={{backgroundImage: `url(${headerBg})`}}>
        <div className={`big-x`}><BigX /></div>

        <div className="main">
          <div className="content">
            <p className="main-category">{currentEvent.category || <span>&nbsp;</span>}</p>
            <p className="main-title">{currentEvent.title}</p>
            <p className="main-description">{currentEvent.description.split('.')[0]}.</p>

            <Button
              type="link"
              text="Learn More"
              linkTo={`/events/${currentEvent.slug}`}
              btnType="secondary"
              className="my-5"
            />
          </div>
        </div>

        <div className="events-list row">
          <div className="list-head col-12">
            <p>Past Events</p>
          </div>

          { events.slice(0,6).map(event => (
            <div key={event.id} className="event-item col-md-2" onClick={() => setCurrentEvent(event)}>
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
