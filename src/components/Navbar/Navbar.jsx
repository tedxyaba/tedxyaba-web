import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import TEDXIcon from '../../assets/images/tedx-yaba-full.png'

const mainRoutes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    show: true
  },
  {
    name: 'Events',
    path: '/events',
    show: true
  },
  {
    name: 'About',
    path: '/about',
    show: true
  },
  {
    name: 'Innovation Lounge',
    path: '/innovation-lounge',
    show: false
  },
  {
    name: 'Contact',
    path: '/contact',
    show: false
  }
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/" id="app-logo" className="navbar-brand app-logo">
        <img src={TEDXIcon} alt="logo" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavMobileDropdown"
        aria-controls="navbarNavMobileDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavMobileDropdown">
        <ul className="navbar-nav ml-auto">
          { !!mainRoutes.length && mainRoutes.map((route, index) => {
            return route.show && (
              <li key={index} className="nav-item">
                <NavLink
                  to={route.path}
                  exact={route.exact}
                  className="nav-link"
                  activeClassName="active">
                  {route.name}
                </NavLink>
              </li>
             )
          }) }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
