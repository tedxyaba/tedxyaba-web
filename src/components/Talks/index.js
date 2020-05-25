import React, { useState } from 'react';
import './styles.scss';
import Section from '../layout/Section';
import { YoutubeThumbnail } from '../YoutubeEmbed';
import moment from 'moment';
import { YoutubeLogo } from '../../utils/images';
import SearchAndFilters from '../SearchAndFilters';

const Talks = ({ talks }) => {
  const [filtered, setFiltered] = useState(null);

  const filterArrays = () => {
    if (filtered === null) return talks;

    return talks.filter(talk => {
      return filtered.findIndex(f => f.id === talk.id) >= 0;
    })
  };

  return (
    <div className="talks">
      <SearchAndFilters
        type="talks"
        onFilter={setFiltered}
        searchPlaceholder="Search talks..."
      />

      <Section className="all-talks">
        <div className="row">
          { (filtered && filtered.length === 0) && (
            <div className="col-md-12 no-results">
              <p>No talks found for your filtered criteria.</p>
            </div>
          ) }

          { filterArrays().map(talk => (
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
        </div>
      </Section>
    </div>
  )
};

export default Talks;
