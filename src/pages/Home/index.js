import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
// import Button from '../../components/Button';
// import { TEDxYabaLogo } from '../../utils/images';
// import Section from '../../components/layout/Section';
import TalksPlayer from '../../components/TalksPlayer';
import Header from '../../components/layout/Header';
import Talks from '../../components/Talks';
import Loading from '../../components/Loading';

const Home = ({ loading, about, talks, copies }) => {
  return (
    <div className="page-container">
      <Header
        id="home-header"
        title={ copies.find(c => c.key === 'dash_copy_header' ).copy }
        subtitle={ copies.find(c => c.key === 'dash_copy_desc' ).copy }
        // subtitle="Enjoy all our talks from inception"
        className="on-home"
      />

      { loading ? <Loading text="Please wait..." /> : (
        <>
        <TalksPlayer talks={talks.recent_talks || []} />
        <Talks talksData={talks} />
        </>
      )}

      {/* <Section className="row home-about">
        <>
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
        </>
      </Section> */}
    </div>
  )
}

const mapStateToProps = ({ loadingBar, about, talks, copies }) => {
  return {
    loading: loadingBar.default > 0,
    about,
    talks,
    copies,
  }
}

export default connect(mapStateToProps)(Home);
