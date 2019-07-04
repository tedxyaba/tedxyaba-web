import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// load pages
import Home from '../src/pages/Home';
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
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
