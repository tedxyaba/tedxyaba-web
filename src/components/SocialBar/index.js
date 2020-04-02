import React from 'react';
import './styles.scss';
import Icon from 'react-web-vector-icons';

const SocialBar = ({ data }) => {
  return (
    <div className="social-bar">
      { data && data.map(item => (
        <div key={item.id}>
          <a href={item.url} className={item.id} target="_blank" rel="noopener noreferrer">
            <Icon
              name={item.icon_name}
              font={item.font}
              color={item.color}
              size={item.size}
            />
          </a>
        </div>
      )) }
    </div>
  )
};

export default SocialBar;
