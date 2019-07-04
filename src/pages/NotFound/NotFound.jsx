import React  from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404: Page Not found</h1>
      <Link to='/'>Take Me Back Home</Link>
    </div>
  )
};

export default NotFound;
