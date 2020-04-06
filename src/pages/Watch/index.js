import React, { useState } from 'react';
import './styles.scss';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import SelectDropdown from '../../components/SelectDropdown';

const Watch = () => {
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
        subtitle="We're excited to share talks from previous events. They can search"
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
    </div>
  )
};

export default Watch;
