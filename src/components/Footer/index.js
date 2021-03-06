import React, { useState } from 'react';
import './styles.scss';
// import { Link } from 'react-router-dom';
import moment from 'moment';
import { navbarLogo } from '../../utils/images';
import SocialIcons from '../SocialIcons';
import Button from '../Button';
import { connect } from 'react-redux';
import fetchApi from '../../utils/fetch-api';

const Footer = ({ data, dispatch }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [formInvalid, setFormInvalid] = useState({
    email: false
  })
  const [response, setResponse] = useState(null);

  const submitForm = async event => {
    event.preventDefault();

    if (!email) {
      setFormInvalid(state => ({...state, email: true}));
      setResponse(['fail', 'Your email address is required!']);
      return;
    } else {
      if (formInvalid.email && response !== null) {
        setFormInvalid(state => ({...state, email: false}));
        setResponse(null)
      }

      setLoading(true);

      try {
        const response = await fetchApi.postData('post', '/newsletter_subscriptions', {email});
        const data = await response.json();

        if (response.status < 300) {
          setResponse(['success', 'Thank you. You’ve been added to the list!']);
          setEmail('');
        } else {
          setFormInvalid(state => ({...state, email: true}));

          if (data[0] === 'Email has already been taken') {
            setResponse(['fail', `"${email}" is already subscribed to our list`]);
          } else {
            setResponse(['fail', data[0]])
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setResponse(['fail', 'Subscription to newsletter failed, please try again.'])
      }
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
                  {loading && <span className="spinner-grow" role="status" /> }
                </div>
                <div className="form-status-wrapped mb-3">
                  { response && <small className={response[0]}>{ response[1] }</small>}
                </div>
              </div>

              <div>
                <Button
                  type="button"
                  text="Subscribe"
                  btnType="primary"
                />
              </div>
            </div>

            <div className="form-roww mt-3">
              <div className="form-status">
                { response && <small className={response[0]}>{ response[1] }</small>}
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
