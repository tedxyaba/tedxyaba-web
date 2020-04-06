import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Section from '../Section';

const Header = ({ title, subtitle, className }) => {
  return (
    <Section className={`page-header ${className}`}>
      <>
      <h1 className="title">{ title }</h1>
      <p className="sub-title">{ subtitle }</p>
      </>
    </Section>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default Header;
