import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { TEDxYabaLogo } from '../../utils/images';

const Home = props => {
  const { about } = props;

  return (
    <div className="page-container container-fluid">
      Welcome back home!

      <section className="row about">
        <div className="col-md-6">
          <div className="ted-about-image">
            <TEDxYabaLogo />
          </div>
        </div>
        <div className="col-md-6 ted-about-content">
          { about.filter(i => i.id === 'tedxyaba').map(item => (
            <div key={item.id}>
              <h3 className="title">{item.title}</h3>
              <p className="multiline-text">{item.content}</p>

              <Button
                type="link"
                text="Learn More"
                linkTo="/about"
                btnType="primary"
              />
            </div>
          )) }
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = ({ about }) => {
  return {
    about,
  }
}

export default connect(mapStateToProps)(Home);
