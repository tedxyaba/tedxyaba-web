import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import Icon from 'react-web-vector-icons';
import moment from 'moment';
import { navbarLogo } from '../../utils/images';

const Footer = ({ data }) => {
  return (
    <footer>
      <div className="content row">
        <div className="col-md-6 join">
          <p className="row-title">JOIN OUR NEWSLETTER</p>
          <p className="join-text">Sign up to hear about new talks, meetups, and the latest TEDxYaba news.</p>
        </div>

        <div className="col-md-3 other-links">
          <p className="row-title">OTHER LINKS</p>
          <ul>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">F.A.Q</Link></li>
          </ul>
        </div>

        <div className="col-md-3">
          <p className="row-title">SOCIALS</p>
        </div>
      </div>

      <div className="copyright">
        <div className="footer-logo">
          <img src={navbarLogo} alt="logo" />
        </div>

        <div className="all-rights">
          <p>Copyright &copy; TEDxYaba {moment().year()}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
