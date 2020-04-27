import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import SelectDropdown from '../../components/SelectDropdown';
import Section from '../../components/layout/Section';
import { YoutubeThumbnail } from '../../components/YoutubeEmbed';
import Icon from 'react-web-vector-icons';
import moment from 'moment';
import withScrollToTop from '../withScrollToTop';

const Watch = ({ talks }) => {
  const [currentSort, setCurrentSort] = useState(null);
  const [sortEvent, setSortEvent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [yearFilter, setYearFilter] = useState('2020');

  const talksSortData = [
    {value: 'all-categories', label: 'All Categories'},
    {value: 'date-uploaded', label: 'Date Uploaded'},
  ];

  const eventsSortData = [
    {value: 'all-events', label: 'All Events'},
    {value: 'bold-brilliant', label: 'Bold + Brilliant'},
  ];

  const years = ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010']

  return (
    <div className="watch">
      <Header
        title="Watch"
        subtitle="We're excited to share talks from previous events."
      />

      <SubHeader className="sorts-and-filters container-fluid">
        <div className="row">
          <div className="col-md-4 watch-sort-by">
            <SelectDropdown
              label="Sort by"
              data={talksSortData}
              onSelect={setCurrentSort}
            />
          </div>
          <div className="col-md-4">
            <input
              id="search-text"
              type="text"
              className="form-control search-input-control"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Search talks..."
            />
          </div>
          <div className="col-md-4">
            <SelectDropdown
              data={eventsSortData}
              onSelect={setSortEvent}
              placeholder="Events"
              mode="transparent"
            />
          </div>
        </div>
      </SubHeader>

      <SubHeader className="filter-years container-fluid mt-3 p-0 text-center">
        <>
        { years.map(item => {
          const active = yearFilter === item;

          return (
            <div key={item} className="year-item mx-3" onClick={() => setYearFilter(item)}>
              <div className={`year-text ${active && 'active'}`}>{ item }</div>
              {active && <div className="active-year-bar" /> }
            </div>
          )
        }) }
        </>
      </SubHeader>

      <Section className="container-fluid all-talks">
        <div className="row">
          { talks.map(talk => (
            <a href={talk.video_url} target="_blank" rel="noopener noreferrer" key={talk.id} className="col-md-4">
              <div className="talk-item">
                <div className="top-bar">
                  <Icon
                    font="AntDesign"
                    name="youtube"
                    color="white"
                    size={43}
                  />
                  <div>{talk.duration}</div>
                </div>

                <YoutubeThumbnail url={talk.video_url} />

                <div className="overlay">
                  <p className="name">{talk.speaker && talk.speaker.name} - <span className="date-year">{moment(talk.date).year()}</span></p>
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

const mapStateToProps = ({ talks }) => {
  return {
    talks,
  }
}

export default withScrollToTop(connect(mapStateToProps)(Watch));
