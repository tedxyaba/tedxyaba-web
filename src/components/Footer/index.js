import React, { useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { navbarLogo } from '../../utils/images';
import SocialIcons from '../SocialIcons';
import Button from '../Button';
import { connect } from 'react-redux';
import fetchApi from '../../utils/fetch-api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const Footer = ({ data, dispatch }) => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState(null);
  const statusText = response === 201 ? 'Thank you for joining our newsletter!' : response;

  const submitForm = async event => {
    event.preventDefault();

    dispatch(showLoading());

    try {
      const response = await fetchApi.postData('post', '/newsletter_subscriptions', {email});
      setResponse(response.status);
      setEmail('');

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      setResponse('Subscription to newsletter failed, please try again.')
    }
  }

  return (
    <footer>
      <div className="content row">
        <div className="col-md-6 join">
          <p className="row-title">JOIN OUR NEWSLETTER</p>
          <p className="join-text">Sign up to hear about new talks, meetups, and the latest TEDxYaba news.</p>

          <form name="newsletter-form" className="newsletter-form" onSubmit={submitForm}>
            <div className="form-row">
              <div className="col-md-8">
                <div className="form-group mr-sm-3">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email address"
                    className="form-control form-control-overides"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                { statusText && <small>{ statusText }</small>}
              </div>

              <div className="col-md-4">
                <Button
                  type="button"
                  text="Submit"
                  btnType="primary"
                />
              </div>
            </div>
          </form>
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
          <p className="row-title">SOCIAL</p>
          <SocialIcons data={data} size={2} />
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

export default connect()(Footer);
