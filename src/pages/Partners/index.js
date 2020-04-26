import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Header from '../../components/layout/Header';
import SubHeader from '../../components/layout/SubHeader';
import Section from '../../components/layout/Section';

const Partners = ({ partners }) => {
  return (
    <div className="partners">
      <Header
        title="Partners"
        subtitle="We have a partnership community who helped make previous TEDxYaba events a huge success. A special thanks for bringing a unique experience for our audience."
      />

      <SubHeader className="partners-sub-text container-fluid">
        <p>If you’re interested in joining the partnerships community for TEDxYaba, kindly send us an email to <a href="mailto:partners@tedxyaba.com">partners@tedxyaba.com</a>. We’re excited to talk with you!</p>
      </SubHeader>

      <Section className="partners-data container-fluid">
        <>
        <div className="content-title">
          <p>COMMUNITY PARTNERS</p>
        </div>

        <div className="row">
          { partners.map(partner => (
            <div key={partner.partner_name} className="col-md-4 partner community">
              <div className="details">
                <img src={partner.logo_url} alt="" />
              </div>
            </div>
          )) }
        </div>
        </>
      </Section>
    </div>
  )
};

const mapStateToProps = ({ partners }) => {
  return {
    partners,
  }
}

export default connect(mapStateToProps)(Partners);
