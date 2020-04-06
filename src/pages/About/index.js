import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import Section from '../../components/layout/Section';

const Partners = ({ about }) => {
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

      
    </div>
  )
};

const mapStateToProps = ({ about }) => {
  return {
    about,
  }
}

export default connect(mapStateToProps)(Partners);
