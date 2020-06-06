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
  const [formInvalid, setFormInvalid] = useState({
    email: false
  })
  const [response, setResponse] = useState(null);

  const submitForm = async event => {
    event.preventDefault();

    if (!email) {
      setFormInvalid(state => ({...state, email: true}));
      return;
    }

    dispatch(showLoading());

    try {
      const response = await fetchApi.postData('post', '/newsletter_subscriptions', {email});
      // const data = await response.json();

      if (response.status < 300) {
        setResponse(['success', 'Thank you. You’ve been added to the list!']);
        setEmail('');
      } else {
        // setResponse(['fail', data[0]])
        setResponse(['fail', `"${email}" is already subscribed to our list`]);
        setFormInvalid(state => ({...state, email: true}));
      }

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      setResponse(['fail', 'Subscription to newsletter failed, please try again.'])
    }
  }

  return (
    <footer>
      <div className="content row">
        <div className="col-md-6 join">
          <form name="newsletter-form" className="newsletter-form" onSubmit={submitForm}>
            <div className="form-roww">
              <div>
                <p className="join-text">Sign up to hear about new talks, meetups, and the latest TEDxYaba news.</p>
                <div className="form-group mr-sm-3">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email address"
                    className={`form-control form-control-overides ${formInvalid.email ? 'invalid' : 'valid'}`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                { response && <small className={response[0]}>{ response[1] }</small>}
              </div>

              <div>
                <Button
                  type="button"
                  text="Subscribe"
                  btnType="primary"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-3 other-links">
          <p className="row-title">OTHER LINKS</p>
          <ul>
            {/* <li><Link to="/">Privacy Policy</Link></li> */}
            <li><a href="mailto:info@tedxyaba.com">Contact</a></li>
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
