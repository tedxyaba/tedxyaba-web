import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import SortBy from '../../components/SortBy';

const Watch = () => {
  const [currentSort, setCurrentSort] = useState(null);

  const talksSortData = [
    {value: 'all-categories', label: 'All Categories'},
    {value: 'date-uploaded', label: 'Date Uploaded'},
  ];

  return (
    <div className="watch">
      <Header
        title="Watch"
        subtitle="We're excited to share talks from previous events. They can search"
      />

      <SubHeader className="sorts-and-filters">
        <div>
          <SortBy
            data={talksSortData}
            onSelect={setCurrentSort}
          />
        </div>
      </SubHeader>
    </div>
  )
};

export default Watch;
