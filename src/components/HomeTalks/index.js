import React, { useState, useEffect } from 'react';
import './styles.scss';
import Section from '../layout/Section';
import Select from 'react-select';
import YoutubeEmbed, { YoutubeThumbnail } from '../YoutubeEmbed';
import moment from 'moment';
import Icon from 'react-web-vector-icons';

const HomeTalks = ({ talks }) => {
  const [sortTalks, setSortTalks] = useState(null);
  const [activeTalk, setActiveTalk] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const [isPlaying, setIsPlaying] = useState(false);

  const checkViewport = () => {
    setIsMobile(window.innerWidth < 767)
  }

  useEffect(() => {
    setActiveTalk(talks[0])
  }, [talks])

  useEffect(() => {
    window.addEventListener('resize', checkViewport)

    return () => {
      window.removeEventListener('resize', checkViewport)
    }
  })

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
                height={isMobile ? 400 : 700}
                width="100%"
                url={activeTalk.video_url || ''}
                className="video-embedded"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <div className="prev-icon">
                <Icon
                  font="MaterialCommunityIcons"
                  name="chevron-left-circle"
                  color="rgba(255,255,255,0.7)"
                  size={40}
                />
              </div>

              <div className="next-icon">
                <Icon
                  font="MaterialCommunityIcons"
                  name="chevron-right-circle"
                  color="rgba(255,255,255,0.7)"
                  size={40}
                />
              </div>

              { isPlaying || (
                <div className="title-and-date">
                  { activeTalk.date ? <p className="date">{ moment(activeTalk.date).format('LL') }</p> : null }
                  <p className="title">{ activeTalk.topic }</p>
                </div>
              ) }
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
