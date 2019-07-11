import React from 'react';
import ReactDOM from 'react-dom';
import NextEvent from './NextEvent';

it('renders NextEvent without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NextEvent  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
