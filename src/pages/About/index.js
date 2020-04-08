import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import Section from '../../components/layout/Section';
import { teamSamplePhoto } from '../../utils/images';
import Icon from 'react-web-vector-icons';

const Partners = ({ about, team }) => {
  const [person, setPerson] = useState({});

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
            <div key={item.id} className={`col-md-4 col-lg-3 team-item ${item.id}`} onClick={() => setPerson(item)} data-toggle="modal" data-target="#teamProfileModal">
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

      <div className="modal fade" id="teamProfileModal" tabIndex="-1" role="dialog" aria-labelledby="teamProfileModalTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-controls">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <Icon
                  font="AntDesign"
                  name="close"
                  color="#101010"
                  size={30}
                />
              </button>
            </div>
            <div className="modal-body">
              <div className="person-image">
                <img src={teamSamplePhoto} alt="team-img" />
              </div>

              <div className="person-n-r">
                <p className="p-name">{ person.name }</p>
                <p className="p-role">{ person.role }</p>
              </div>

              <div className="person-social-links">
                { person.linkedin_url && person.linkedin_url.length ? (
                  <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Icon
                      name="linkedin-box"
                      font="MaterialCommunityIcons"
                      color="#0077b7"
                      size={32}
                    />
                  </a>
                ) : null }

                { person.twitter_url && person.twitter_url.length ? (
                  <a href={person.twitter_url} target="_blank" rel="noopener noreferrer">
                    <Icon
                      name="twitter-box"
                      font="MaterialCommunityIcons"
                      color="#00c3ff"
                      size={32}
                    />
                  </a>
                ) : null }
              </div>

              <p className="multiline-text">{ person.bio }</p>
            </div>
          </div>
        </div>
      </div>
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
