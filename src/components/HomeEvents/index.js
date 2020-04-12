import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import Section from '../layout/Section';
import Button from '../Button';

const HomeEvents = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState({});

  useEffect(() => {
    setCurrentEvent(events[0])
  }, [events])

  return (
    <Section className="home-events">
      <header>
        <div className="main">
          <p className="main-title">{currentEvent.title}</p>
          <p className="main-category">{currentEvent.category}</p>
          
          <Button
            type="link"
            text="Learn More"
            linkTo={`/events/${currentEvent.id}`}
            btnType="secondary"
            className="my-5"
          />
        </div>

        <div className="events-list row">
          <div className="list-head col-12">
            <p>Past Events</p>
          </div>

          { events.slice(0,5).map(event => (
            <div key={event.id} className="event-item col-sm-2" onClick={() => setCurrentEvent(event)}>
              <div className={`event-details ${ (currentEvent && currentEvent.id === event.id) ? 'active' : '' }`}>
                <p className="event-title">{event.title}</p>
                <p className="event-category">{event.category || <span>&nbsp;</span>}</p>
              </div>
            </div>
          )) }

          <div className="event-item col-sm-2">
            <Link to="/events">
              <div className="event-details more-events">
                <p>More Events...</p>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </Section>
  )
}

export default HomeEvents;
