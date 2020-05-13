import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import Section from '../layout/Section';
import YoutubeEmbed, { YoutubeThumbnail } from '../YoutubeEmbed';
import moment from 'moment';
import Icon from 'react-web-vector-icons';

const TalksPlayer = ({ talks }) => {
  const [activeTalk, setActiveTalk] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [onPause, setOnPause] = useState(false);

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

  const onSetActiveTalk = (talk) => {
    setOnPause(false);
    setActiveTalk(talk)
  }

  const playPrev = () => {
    onSetActiveTalk(talks[currentIndex()-1])
  };

  const playNext = () => {
    onSetActiveTalk(talks[currentIndex()+1])
  }

  const pausePlayer = () => {
    setIsPlaying(false);
    setOnPause(true);
  }

  return (
    <Section className="talks-player">
      <div className="content">
        <div className="main-talk row">
          { (!isPlaying) && (
              <div className="right-highlight col-12">
                RECENT TALKS
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
                onPause={pausePlayer}
              />

              { (isReady && !isPlaying) && (
                <>
                { currentIndex() > 0 && (
                  <div className="prev-icon" onClick={playPrev}>
                    <Icon
                      font="Entypo"
                      name="chevron-thin-left"
                      color="#0a0a0a"
                      size={20}
                    />
                  </div>
                ) }

                { currentIndex() < talks.length-1 && (
                  <div className="next-icon" onClick={playNext}>
                    <Icon
                      font="Entypo"
                      name="chevron-thin-right"
                      color="#0a0a0a"
                      size={20}
                    />
                  </div>
                ) }

                { onPause || <div className="title-and-date">
                  { activeTalk.date ? <p className="name-date">{activeTalk.speaker && activeTalk.speaker.name} - {moment(activeTalk.date).year()}</p> : null }
                  <p className="title">{ activeTalk.topic }</p>
                </div> }
                </>
              ) }
            </div>
          </div>
        </div>
        <div className="talks-list row">
          { talks.slice(0,6).map(talk => (
            <div key={talk.id} className="talk-item col-sm-2" onClick={() => onSetActiveTalk(talk)}>
              <div className="talk-details">
                <YoutubeThumbnail url={talk.video_url} />
                { activeTalk && activeTalk.id !== talk.id && <div className="overlay" /> }
              </div>
            </div>
          )) }
          { false && <div className="talk-item col-sm-2">
            <Link to="/watch">
              <div className="talk-details more-talks">
                <p>More Talks...</p>
              </div>
            </Link>
          </div> }
        </div>
      </div>
    </Section>
  )
}

export default TalksPlayer;
