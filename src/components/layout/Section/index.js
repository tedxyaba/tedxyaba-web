import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Section = ({ id, children, className }) => {
  return (
    <section id={id} className={`page-section container-fluid ${className || ''}`}>
      {children}
    </section>
  )
}

Section.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element.isRequired
}

export default Section;
