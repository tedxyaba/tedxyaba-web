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
import Home from './pages/Home';
import Event from './pages/Event';
import Events from './pages/Events';
import About from './pages/About';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// load components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = ({ socials, dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData())
  })

  return (
    <div>
      <Router>
        <LoadingBar className="loading-bar" />

        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/events/:slug" component={Event} />
            <Route path="/events" component={Events} />
            <Route path="/register/:slug?" component={Register} />
            <Route component={NotFound} />
          </Switch>

          <Footer data={socials} />
        </div>
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
