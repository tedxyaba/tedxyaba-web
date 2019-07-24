import React from 'react';
import ReactDOM from 'react-dom';
import PreviousEvents from './PreviousEvents';

it('renders NextEvent without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PreviousEvents  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
