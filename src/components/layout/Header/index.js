import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Section from '../Section';
import { BackgroundX } from '../../../utils/images';

const Header = ({ title, subtitle, className }) => {
  return (
    <Section className={`page-header ${className}`}>
      <>
      <div className="content">
        <h1 className="title">{ title }</h1>
        <p className="sub-title">{ subtitle }</p>
      </div>

      { className === 'on-home' ? <div className={`${className}-x`}><BackgroundX /></div> : null }
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
