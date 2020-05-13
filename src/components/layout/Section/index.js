import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Section = ({ children, className }) => {
  return (
    <section className={`page-section container-fluid ${className || ''}`}>
      {children}
    </section>
  )
}

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired
}

export default Section;
