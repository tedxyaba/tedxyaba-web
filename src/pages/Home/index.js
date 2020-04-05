import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { TEDxYabaLogo } from '../../utils/images';
import Section from '../../components/layout/Section';
import Select from 'react-select';
import YoutubeEmbed, { YoutubeThumbnail } from '../../components/YoutubeEmbed';

const Home = ({ about, talks }) => {
  const [sortTalks, setSortTalks] = useState(null);
  const [activeTalk, setActiveTalk] = useState({});
  const sortSelectData = [
    {value: 'most-popular', label: 'Most Popular'},
    {value: 'date', label: 'Date'}
  ]

  return (
    <div className="page-container container-fluid">
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
            <div className="right-highlight col-12">TEDxYaba 2019</div>
            <div className="col-12">
              <YoutubeEmbed
                height="700"
                width="100%"
                url={activeTalk.video_url || ''}
              />
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

      <Section className="row home-about">
        <>
        <div className="col-md-6">
          <div className="ted-about-image">
            <TEDxYabaLogo />
          </div>
        </div>
        <div className="col-md-6 ted-about-content">
          { about.filter(i => i.id === 'tedxyaba').map(item => (
            <div key={item.id}>
              <h3 className="title">{item.title}</h3>
              <p className="multiline-text">{item.content}</p>

              <Button
                type="link"
                text="Learn More"
                linkTo="/about"
                btnType="primary"
              />
            </div>
          )) }
        </div>
        </>
      </Section>
    </div>
  )
}

const mapStateToProps = ({ about, talks }) => {
  return {
    about,
    talks,
  }
}

export default connect(mapStateToProps)(Home);
