import React from 'react';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';

const Watch = () => {
  return (
    <div className="watch">
      <Header
        title="Watch"
        subtitle="We're excited to share talks from previous events. They can search"
      />

      <SubHeader className="sorts-and-filters">
        <div>Wake up!</div>
      </SubHeader>
    </div>
  )
};

export default Watch;
