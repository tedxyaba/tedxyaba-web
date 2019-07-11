import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel';

it('renders Carousel without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Carousel />, div);
  ReactDOM.unmountComponentAtNode(div);
});
