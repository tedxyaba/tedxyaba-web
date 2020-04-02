import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';
import { navbarLogo } from '../../utils/images';

const mainRoutes = [
  {
    name: 'Watch',
    path: '/watch',
    show: true
  },
  {
    name: 'Blog',
    path: '/blog',
    show: true
  },
  {
    name: 'Get Involved',
    path: '/get-involved',
    show: true
  },
  {
    name: 'Partners',
    path: '/partners',
    show: true
  },
  {
    name: 'About',
    path: '/about',
    show: true
  },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <Link to="/" id="app-logo" className="navbar-brand app-logo">
        <img src={navbarLogo} alt="logo" />
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
                { (route.path === pathname || pathname === '/') &&
                  <div className={`active-bar ${pathname === '/' ? 'quiet' : ''}`}></div>
                }
              </li>
             )
          }) }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
