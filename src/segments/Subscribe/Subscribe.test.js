import React from 'react';
import ReactDOM from 'react-dom';
import Subscribe from './Subscribe';

it('renders NextEvent without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Subscribe  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
