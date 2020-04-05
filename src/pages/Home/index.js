import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { TEDxYabaLogo } from '../../utils/images';
import Section from '../../components/layout/Section';
import Select from 'react-select';
import YoutubeEmbed from '../../components/YoutubeEmbed';

const Home = ({ about }) => {
  const [sortTalks, setSortTalks] = useState(null);
  const sortSelectData = [
    {value: 'most-popular', label: 'Most Popular'},
    {value: 'date', label: 'Date'}
  ]

  return (
    <div className="page-container container-fluid">
      Welcome back home!

      <Section className="home-talks">
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

const mapStateToProps = ({ about }) => {
  return {
    about,
  }
}

export default connect(mapStateToProps)(Home);
