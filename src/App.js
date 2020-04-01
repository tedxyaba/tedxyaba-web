import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';

// load pages
import Home from '../src/pages/Home';
// import Event from './pages/Event';
// import Watch from '../src/pages/Watch';
// import Blog from '../src/pages/Blog';
// import GetInvolved from '../src/pages/GetInvolved';
// import Partners from '../src/pages/Partners';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import Faqs from './pages/Faqs';
// import NotFound from './pages/NotFound';

// load components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
