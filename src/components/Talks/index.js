import React, { useState } from 'react';
import './styles.scss';
import Header from '../layout/Header';
import SubHeader from '../layout/SubHeader';
import SelectDropdown from '../SelectDropdown';
import Section from '../layout/Section';
import { YoutubeThumbnail } from '../YoutubeEmbed';
import Icon from 'react-web-vector-icons';
import moment from 'moment';

const Talks = ({ talks }) => {
  const [categorySort, setCategorySort] = useState(null);
  const [sortYear, setSortYear] = useState(null);
  const [searchText, setSearchText] = useState('');

  const categoriesSortData = [
    {value: 'all', label: 'ALL'},
    {value: 'salon', label: 'Salon Series'},
    {value: 'virtual', label: 'Virtual Series'},
    {value: 'uncategorized', label: 'Uncategorized'},
  ];

  const yearsSortData = [
    {value: 'all', label: 'ALL'},
    {value: '2020', label: '2020'},
    {value: '2019', label: '2019'},
    {value: '2018', label: '2018'},
    {value: '2017', label: '2017'},
    {value: '2016', label: '2016'},
    {value: '2015', label: '2015'},
  ];

  return (
    <div className="talks">
      <SubHeader className="sorts-and-filters">
        <div className="row justify-content-center">
          <div className="columns col-md-12 col-lg-10">
            <div className="category">
              <SelectDropdown
                label="Sort by"
                preSelected={categoriesSortData[0]}
                data={categoriesSortData}
                onSelect={setCategorySort}
                mode="white"
              />
            </div>
            <div className="years">
              <SelectDropdown
                label="Year"
                preSelected={yearsSortData[0]}
                data={yearsSortData}
                onSelect={setSortYear}
                mode="white"
              />
            </div>
            <div className="search">
              <input
                id="search-text"
                type="text"
                className="form-control search-input-control"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search talks..."
              />
            </div>
          </div>
        </div>
      </SubHeader>

      <Section className="container-fluid all-talks">
        <div className="row">
          { talks.map(talk => (
            <a href={talk.video_url} target="_blank" rel="noopener noreferrer" key={talk.id} className="col-md-4">
              <div className="talk-item">
                <div className="top-bar">
                  <Icon
                    font="Ionicons"
                    name="logo-youtube"
                    color="#af0000"
                    size={30}
                  />
                  <div>{talk.video_duration && talk.video_duration.match(/\d+/g).join(':')}</div>
                </div>

                <YoutubeThumbnail url={talk.video_url} />

                <div className="overlay">
                  <p className="name">
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
