import React, { useState, useEffect } from 'react';
import './styles.scss';
import Section from '../layout/Section';
import Select from 'react-select';
import YoutubeEmbed, { YoutubeThumbnail } from '../YoutubeEmbed';
import moment from 'moment';

const HomeTalks = ({ talks }) => {
  const [sortTalks, setSortTalks] = useState(null);
  const [activeTalk, setActiveTalk] = useState({});

  useEffect(() => {
    setActiveTalk(talks[0])
  }, [talks])

  const sortSelectData = [
    {value: 'most-popular', label: 'Most Popular'},
    {value: 'date', label: 'Date'}
  ]

  return (
    <Section className="home-talks">
      <>
      <div className="sortby">
        <p>Sort by</p>
        <Select
          id="sortby-select"
          className="sortby-select"
          classNamePrefix="sortby"
          value={sortTalks}
          options={sortSelectData}
          onChange={setSortTalks}
          placeholder="Select..."
          isSearchable={false}
          width="200px"
        />
      </div>

      <div className="content">
        <div className="main-talk row">
          <div className="right-highlight col-12">TEDxYaba { activeTalk.date ? moment(activeTalk.date).year() : moment().year() }</div>

          <div className="col-12">
            <div className="talk-col">
              <YoutubeEmbed
                height="700"
                width="100%"
                url={activeTalk.video_url || ''}
                className="video-embedded"
              />
              <div class="title-and-date">
                { activeTalk.date ? <p className="date">{ moment(activeTalk.date).format('LL') }</p> : null }
                <p className="title">{ activeTalk.topic }</p>
              </div>
            </div>
          </div>
        </div>
        <div className="talks-list row">
          { talks.slice(0,5).map(talk => (
            <div key={talk.id} className="talk-item col-sm-2" onClick={() => setActiveTalk(talk)}>
              <div className="talk-details">
                <YoutubeThumbnail url={talk.video_url} />
                { activeTalk && activeTalk.id !== talk.id && <div className="overlay" /> }
              </div>
            </div>
          )) }
          <div className="talk-item col-sm-2">
            <div className="talk-details">
              <p>More Talks...</p>
            </div>
          </div>
        </div>
      </div>
      </>
    </Section>
  )
}

export default HomeTalks;
