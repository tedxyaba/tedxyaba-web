import React from 'react';

// load pages
import Home from '../src/pages/Home';

// load components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
