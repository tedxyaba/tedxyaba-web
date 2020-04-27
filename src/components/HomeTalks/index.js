import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import Section from '../layout/Section';
import YoutubeEmbed, { YoutubeThumbnail } from '../YoutubeEmbed';
import moment from 'moment';
import Icon from 'react-web-vector-icons';
import SelectDropdown from '../SelectDropdown';

const HomeTalks = ({ talks }) => {
  const [sortTalks, setSortTalks] = useState(null);
  const [activeTalk, setActiveTalk] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const [isReady, setIsReady] = useState(false);
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

  const currentIndex = () => {
    return talks.findIndex(item => item.id === activeTalk.id)
  }

  const playPrev = () => {
    setActiveTalk(talks[currentIndex()-1])
  };

  const playNext = () => {
    setActiveTalk(talks[currentIndex()+1])
  }

  const sortSelectData = [
    {value: 'most-popular', label: 'Most Popular'},
    {value: 'date', label: 'Date'}
  ];

  return (
    <Section className="home-talks">
      <>
      <SelectDropdown
        label="Sort by"
        data={sortSelectData}
        onSelect={setSortTalks}
      />

      <div className="content">
        <div className="main-talk row">
          { (isReady && !isPlaying) && (
              <div className="right-highlight col-12">
                TEDxYaba { activeTalk.date ? moment(activeTalk.date).year() : moment().year() }
              </div>
          ) }

          <div className="col-12">
            <div className="talk-col">
              <YoutubeEmbed
                height={isMobile ? 400 : 700}
                width="100%"
                url={activeTalk.video_url || ''}
                className="video-embedded"
                onReady={() => setIsReady(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              { (isReady && !isPlaying) && (
                <>
                { currentIndex() > 0 && (
                  <div className="prev-icon" onClick={playPrev}>
                    <Icon
                      font="MaterialCommunityIcons"
                      name="chevron-left-circle"
                      color="rgba(255,255,255,0.7)"
                      size={40}
                    />
                  </div>
                ) }

                { currentIndex() < talks.length-1 && (
                  <div className="next-icon" onClick={playNext}>
                    <Icon
                      font="MaterialCommunityIcons"
                      name="chevron-right-circle"
                      color="rgba(255,255,255,0.7)"
                      size={40}
                    />
                  </div>
                ) }

                <div className="title-and-date">
                  { activeTalk.date ? <p className="date">{ moment(activeTalk.date).format('LL') }</p> : null }
                  <p className="title">{ activeTalk.topic }</p>
                </div>
                </>
              ) }
            </div>
          </div>
        </div>
        <div className="talks-list row">
          {/* TODO: Change key back to talk.id when api is updated to return talk id. NB: using "index" is not performant. */}
          { talks.slice(0,5).map((talk, index) => (
            <div key={index} className="talk-item col-sm-2" onClick={() => setActiveTalk(talk)}>
              <div className="talk-details">
                <YoutubeThumbnail url={talk.video_url} />
                { activeTalk && activeTalk.id !== talk.id && <div className="overlay" /> }
              </div>
            </div>
          )) }
          { talks.length > 5 && <div className="talk-item col-sm-2">
            <Link to="/watch">
              <div className="talk-details more-talks">
                <p>More Talks...</p>
              </div>
            </Link>
          </div> }
        </div>
      </div>
      </>
    </Section>
  )
}

export default HomeTalks;
