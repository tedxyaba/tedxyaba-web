import React  from 'react';
import { Link } from 'react-router-dom';
import Section from '../../components/layout/Section';

const NotFound = () => {
  return (
    <Section className="not-found text-center">
      <>
      <h1>404: Page Not found</h1>
      <Link to='/'>Watch Inspiring Talks</Link>
      </>
    </Section>
  )
};

export default NotFound;
