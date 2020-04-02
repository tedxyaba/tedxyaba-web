import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Icon from 'react-web-vector-icons';

const SocialIcons = ({ data, size }) => {
  const sizeClass = {1: 's1', 2: 's2'};
  
  return (
    <div className="social-icons">
      { data && data.map(item => (
        <div key={item.id}>
          <a href={item.url} className={`${item.id} ${sizeClass[size]}`} target="_blank" rel="noopener noreferrer">
            <Icon
              name={item.icon_name}
              font={item.font}
              color={item.color}
              size={item.size*size}
            />
          </a>
        </div>
      )) }
    </div>
  )
};

SocialIcons.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.number,
};

SocialIcons.defaultProps = {
  size: 1
};

export default SocialIcons;
