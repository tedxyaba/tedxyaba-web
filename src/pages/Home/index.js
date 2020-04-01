import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';

const Home = props => {
  const { about, socials } = props;

  console.log(about)

  return (
    <div className="page-container">
      Welcome back home!

      <section>
        { about.filter(i => i.id === 'tedxyaba').map(item => (
          <div key={item.id}>
            <div>
              <h3 className="title">{item.title}</h3>
              <p className="multiline-text">{item.content}</p>
              <button>Learn More</button>
            </div>
          </div>
        )) }
      </section>
    </div>
  )
}

const mapStateToProps = ({ about, socials }) => {
  return {
    about,
    socials,
  }
}

export default connect(mapStateToProps)(Home);
