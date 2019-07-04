import React from 'react';
import './Navbar.scss';

const Navbar = (props) => {
  const title = props.title || 'Tedx Yaba';

  return (
    <div>
      <div>{title}</div>
      <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/about">Events</a>
      </div>
    </div>
  )
}

export default Navbar;
