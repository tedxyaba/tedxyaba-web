import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import Section from '../../components/layout/Section';
import { teamSamplePhoto } from '../../utils/images';

const Partners = ({ about, team }) => {
  return (
    <div className="about">
      <Header
        title="About"
        subtitle="What is TEDxYaba? | Largest Technology Ecosystem | Inspiring Yaba Since 20??"
      />

      <SubHeader className="about-list container-fluid">
        <Section>
          <div className="row">
            { about.map(item => (
              <div key={item.id} className="col-md-4 about-item">
                <div className="details">
                  <p className="about-title">{ item.title }</p>
                  <p className="multiline-text">{ item.content }</p>
                </div>
              </div>
            )) }
          </div>
        </Section>
      </SubHeader>

      <Section className="team-list container-fluid">
        <div className="row">
          { team.map(item => (
            <div key={item.id} className={`col-md-4 col-lg-3 team-item ${item.id}`}>
              { item.id === 'intro' ? (
                <div className="details">
                  <p className="team-title">{ item.title }</p>
                  <p className="multiline-text">{ item.content }</p>
                </div>
              ) : (
                <div className="details">
                  <img src={teamSamplePhoto} alt="team-img" />
                  <div className="overlay">
                    <p className="item-name">{item.name}</p>
                    <p className="item-role">{item.role}</p>
                  </div>
                </div>
              ) }
            </div>
          )) }
        </div>
      </Section>
    </div>
  )
};

const mapStateToProps = ({ about, team }) => {
  return {
    about,
    team
  }
}

export default connect(mapStateToProps)(Partners);
