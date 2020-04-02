import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';

const Home = props => {
  const { about } = props;

  return (
    <div className="page-container">
      Welcome back home!

      <section>
        { about.filter(i => i.id === 'tedxyaba').map(item => (
          <div key={item.id}>
            <div>
              <h3 className="title">{item.title}</h3>
              <p className="multiline-text">{item.content}</p>

              <Button
                type="link"
                text="Learn More"
                linkTo="/about"
                btnType="primary"
              />
            </div>
          </div>
        )) }
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
