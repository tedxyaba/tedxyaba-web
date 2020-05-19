import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

const Button = props => {
  const {
    icon,
    type,
    text,
    href,
    target,
    linkTo,
    btnType,
    onClick,
    className
  } = props;
  const classes = `btn btn-${btnType} ${className ? className : ''}`;

  switch (type) {
    case 'button':
      return (
        <button
          className={classes}
          onClick={onClick}>
          {text}
        </button>
      )
    case 'link':
      return (
        <Link to={linkTo} className={classes}>
          {text}
        </Link>
      )
    case 'link-external':
      return (
        <a
          href={href}
          target={target}
          className={classes}>
          {text}
        </a>
      )
    case 'button-icon':
      return (
        <button
          className={classes}
          onClick={onClick}>
          {icon}
          {text}
        </button>
      )
    default:
      return (
        <button className="btn btn-default">
          {text}
        </button>
      )
  }
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  btnType: PropTypes.string,
  linkTo: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  btnType: 'default'
};

export default Button;
