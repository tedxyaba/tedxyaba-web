import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import Section from '../../components/layout/Section';
import { defaultPerson } from '../../utils/images';
import withScrollToTop from '../withScrollToTop';
import PersonModal from '../../components/Modals/PersonModal';

const About = ({ about, team }) => {
  const [person, setPerson] = useState({});
  const [imageLoadedClass, setImageLoadedClass] = useState('');

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
                <div className="details default-image" style={{backgroundImage:`url(${defaultPerson})`}}>
                  <img
                    src={item.image_url || defaultPerson}
                    alt=""
                    className={`person-image ${imageLoadedClass}`}
                    onLoad={() => setImageLoadedClass('fade-in')}
                  />
                  <div className="overlay">
                    <p className="item-name">{item.first_name} {item.last_name}</p>
                    <p className="item-role">{item.role}</p>
                  </div>
                </div>
              ) }
            </div>
          )) }
        </div>
      </Section>

      <PersonModal
        id="teamProfileModal"
        person={{
          image_url: person.image_url,
          name: `${ person.first_name } ${ person.last_name }`,
          linkedin_url: person.linkedin_url,
          twitter_handle: person.twitter_handle,
          bio: person.bio,
          role: person.role
        }}
      />
    </div>
  )
};

const mapStateToProps = ({ about, team }) => {
  return {
    about,
    team
  }
}

export default withScrollToTop(connect(mapStateToProps)(About));
