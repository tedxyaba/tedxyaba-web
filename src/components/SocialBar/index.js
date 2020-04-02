import React from 'react';
import './styles.scss';
import SocialIcons from '../SocialIcons';

const SocialBar = ({ data }) => {
  return (
    <div className="social-bar">
      <SocialIcons data={data} />
    </div>
  )
};

export default SocialBar;
