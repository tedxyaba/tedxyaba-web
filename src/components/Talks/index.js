import React, { useState, useEffect } from 'react';
import './styles.scss';
import Section from '../layout/Section';
import { YoutubeThumbnail } from '../YoutubeEmbed';
import moment from 'moment';
import { YoutubeLogo } from '../../utils/images';
import SearchAndFilters from '../SearchAndFilters';
import Button from '../Button';

const Talks = ({ talks }) => {
  const desktop = 9;
  const mobile = 6;

  const [filtered, setFiltered] = useState(null);
  const [showCount, setShowCount] = useState(desktop);

  const checkViewport = () => {
    if (window.innerWidth < 768) {
      setShowCount(mobile)
    } else {
      setShowCount(desktop)
    }
  };

  useEffect(() => {
    checkViewport();
  }, [])

  useEffect(() => {
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  });

  const filterTalks = (data) => {
    checkViewport();
    setFiltered(data);
  };

  const loadMore = () => {
    const increment = window.innerWidth < 768 ? mobile : desktop;
    setShowCount(showCount + increment);
  };

  const filteredArrays = () => {
    if (filtered === null) return talks;

    return talks.filter(talk => {
      return filtered.findIndex(f => f.id === talk.id) >= 0;
    })
  };

  return (
    <div className="talks">
      <SearchAndFilters
        type="talks"
        onFilter={filterTalks}
        searchPlaceholder="Search talks..."
      />

      <Section className="all-talks">
        <div className="row">
          { (filtered && filtered.length === 0) && (
            <div className="col-md-12 no-results">
              <p>No talks found for your filters criteria.</p>
            </div>
          ) }

          { filteredArrays().slice(0,showCount).map(talk => (
            <a href={talk.video_url} target="_blank" rel="noopener noreferrer" key={talk.id} className="item-col col-sm-6 col-md-6 col-lg-4">
              <div className="talk-item">
                <div className="top-bar">
                  <YoutubeLogo />
                  <div>{talk.video_duration && talk.video_duration.match(/\d+/g).join(':')}</div>
                </div>

                <YoutubeThumbnail url={talk.video_url} />

                <div className="overlay">
                  <p className="name-date">
                    {talk.speaker && talk.speaker.name}
                    { talk.date && <span className="date-year"> - {moment(talk.date).year()}</span> }
                  </p>
                  <p className="topic">{talk.topic}</p>
                </div>
              </div>
            </a>
          )) }

          { (filteredArrays().length > 0 && showCount < filteredArrays().length) && (
            <div className="col-12 mt-5 text-center">
              <Button
                type="button"
                text="Load Past Talks"
                btnType="primary"
                onClick={loadMore}
              />
            </div>
          )}
        </div>
      </Section>
    </div>
  )
};

export default Talks;
