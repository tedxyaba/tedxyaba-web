import React, { useState, useEffect } from 'react';
import './styles.scss';
import $ from 'jquery';
import { connect } from 'react-redux';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import Section from '../../components/layout/Section';
import { defaultPerson } from '../../utils/images';
import withScrollToTop from '../withScrollToTop';
import PersonModal from '../../components/Modals/PersonModal';
import Icon from 'react-web-vector-icons';

const About = ({ about, team }) => {
  const [person, setPerson] = useState({});
  const [accordionId, setAccordionId] = useState('');

  useEffect(() => {
    $(`#collapse-${accordionId}`).on('show.bs.collapse', () => {
      $(`#heading-${accordionId}`).addClass('is-open');
    });

    $(`#collapse-${accordionId}`).on('hide.bs.collapse', () => {
      $(`#heading-${accordionId}`).removeClass('is-open');
    });
  }, [accordionId]);

  return (
    <div className="about">
      <Header
        title="About"
        subtitle="What is TEDxYaba? | Largest Technology Ecosystem | Inspiring Yaba Since 2017"
      />

      <SubHeader className="about-list container-fluid">
        <Section>
          <>
          <div id="aboutAccordion">
            { about.map(item => (
              <div key={item.id} className="a-card card">
                <div
                  className="about-card-header"
                  id={`heading-${item.id}`}
                  data-toggle="collapse"
                  data-target={`#collapse-${item.id}`}
                  aria-expanded="true"
                  aria-controls={`collapse-${item.id}`}
                  onClick={() => setAccordionId(item.id)}>

                  <h5 className="mb-0">
                    { item.title }
                  </h5>

                  <div className="action-icon">
                    <Icon
                      font="Feather"
                      name="chevron-down"
                      color="#474350"
                      size={30}
                    />
                  </div>
                </div>

                <div id={`collapse-${item.id}`} className="about-collapse collapse" aria-labelledby={`heading-${item.id}`} data-parent="#aboutAccordion">
                  <div className="about-card-body multiline-text">
                  { item.content }
                  </div>
                </div>
              </div>
            )) }
          </div>

          <div id="aboutRow" className="row">
            { about.map(item => (
              <div key={item.id} className="col-md-4 about-item">
                <div className="details">
                  <p className="about-title">{ item.title }</p>
                  <p className="multiline-text">{ item.content }</p>
                </div>
              </div>
            )) }
          </div>
          </>
        </Section>
      </SubHeader>

      <Section className="team-list container-fluid">
        <div className="row">
          { team.map(item => (
            <div key={item.id} className={`col-sm-6 col-md-6 col-lg-4 col-xl-3 team-item ${item.id}`}>
              { item.id === 'intro' ? (
                <div className="details">
                  <p className="team-title">{ item.title }</p>
                  <p className="multiline-text">{ item.content }</p>
                </div>
              ) : (
                <div className="details default-image" style={{backgroundImage:`url(${item.image_url || defaultPerson})`}} onClick={() => setPerson(item)} data-toggle="modal" data-target="#teamProfileModal">
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
