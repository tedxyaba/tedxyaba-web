import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions';
import LoadingBar from 'react-redux-loading-bar';

// load pages
import Home from '../src/pages/Home';
import Event from './pages/Event';
import Events from './pages/Events';
import Watch from '../src/pages/Watch';
import Partners from '../src/pages/Partners';
import About from '../src/pages/About';
import NotFound from '../src/pages/NotFound';

// load components
import Navbar from './components/Navbar';
import SocialBar from './components/SocialBar';
import Footer from './components/Footer';

const App = ({ socials, dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData())
  })

  return (
    <div className="App">
      <Router>
        <LoadingBar className="loading-bar" />
        <SocialBar data={socials} />
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/watch" component={Watch} />
          <Route path="/partners" component={Partners} />
          <Route path="/about" component={About} />
          <Route path="/events/:id" component={Event} />
          <Route path="/events" component={Events} />
          <Route component={NotFound} />
        </Switch>

        <Footer data={socials} />
      </Router>
    </div>
  );
}

const mapStateToProps = ({ socials }) => {
  return {
    socials,
  }
};

export default connect(mapStateToProps)(App);
