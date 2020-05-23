import React from 'react';
import './styles.scss'
import Section from '../layout/Section';

const Loading = ({ text }) => {
  return (
    <Section className="page-loading text-center">
      <>
      <div className="spinner-grow" role="status" />
      <p className="loading-text">{text || 'Loading...'}</p>
      </>
    </Section>
  )
}

export default Loading
