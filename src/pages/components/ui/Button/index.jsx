import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './button.scss';

const Button = props => {
  const {
    type,
    text,
    href,
    target,
    linkTo,
    btnType,
    onClick,
    classNames
  } = props;
  const classes = `btn btn-${btnType} ${classNames ? classNames : ''}`;

  switch (type) {
    case 'link':
      return (
        <a
          href={href}
          target={target}
          className={classes}>
          <Fragment>
            <span>{text}</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </Fragment>
        </a>
      )
    case 'button':
      return (
        <button
          className={classes}
          onClick={onClick}>
          {text}
        </button>
      )
    case 'link-internal':
      return (
        <Link to={linkTo} className={classes}>
          {text}
        </Link>
      )
    default:
      return (
        <div>{text}</div>
      )
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  btnType: PropTypes.string,
  linkTo: PropTypes.string
}

Button.defaultProps = {
  btnType: 'default'
}

export default Button
