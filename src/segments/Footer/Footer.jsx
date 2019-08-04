import React from 'react';
// import { Link } from 'react-router-dom';
import './Footer.scss';
import Icon from 'react-web-vector-icons';

const socialData = [
  {
    name: 'facebook',
    url: 'https://web.facebook.com/TEDxYaba/',
    iconName: 'facebook',
    font: 'Entypo'
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/tedxyaba',
    iconName: 'twitter',
    font: 'Entypo'
  },
  {
    name: 'medium',
    url: 'https://medium.com/tedxyaba',
    iconName: 'medium-monogram',
    font: 'AntDesign'
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/tedxyaba/',
    iconName: 'social-instagram',
    font: 'SimpleLineIcons'
  }
]

const Footer = props => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row my-4 text-center justify-content-center">
          <div className="col-12 col-md-6">
            <p className="title main">TEDx YABA</p>
            <p className="title">Follow us on Social Media</p>

            <ul className="social-links">
              { socialData.map((s, i) => (
                <li key={i}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <Icon
                      name={s.iconName}
                      font={s.font}
                      color="inherit"
                      size={30}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="copyright">&copy; 2019 TEDx Yaba. All rights reserved.</p>
    </footer>
  )
}

export default Footer
