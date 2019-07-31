import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './section.scss';

const Section = props => {
  return (
    <Fragment>
      <section className={`t-section ${props.classNames}`}>
        <h4 className="t-title">{props.title}</h4>

        {props.children}
      </section>
    </Fragment>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default Section
