import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// load pages
import Home from '../src/pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import InnovationLounge from './pages/InnovationLounge';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// load components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/events" component={Events} />
          <Route path="/innovation-lounge" component={InnovationLounge} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
