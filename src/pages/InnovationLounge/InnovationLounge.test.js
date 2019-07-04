import React from 'react';
import ReactDOM from 'react-dom';
import InnovationLounge from './InnovationLounge';

it('renders InnovationLounge without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InnovationLounge />, div);
  ReactDOM.unmountComponentAtNode(div);
});
