import React, { useState } from 'react';
import './styles.scss';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import SelectDropdown from '../../components/SelectDropdown';

const Watch = () => {
  const [currentSort, setCurrentSort] = useState(null);
  const [sortEvent, setSortEvent] = useState(null);
  const [searchText, setSearchText] = useState('');

  const talksSortData = [
    {value: 'all-categories', label: 'All Categories'},
    {value: 'date-uploaded', label: 'Date Uploaded'},
  ];

  const eventsSortData = [
    {value: 'all-events', label: 'All Events'},
    {value: 'bold-brilliant', label: 'Bold + Brilliant'},
  ];

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
            />
          </div>
        </div>
      </SubHeader>
    </div>
  )
};

export default Watch;
