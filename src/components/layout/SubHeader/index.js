import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const SubHeader = ({ children, className }) => {
  return (
    <div className={`page-sub-header ${className}`}>
      { children }
    </div>
  )
};

SubHeader.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default SubHeader;
