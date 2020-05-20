import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Icon from 'react-web-vector-icons';
import { defaultPerson } from '../../utils/images';

const PersonModal = ({ id, person }) => {
  return (
    <div className="modal tedxyaba-modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Title`} aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{backgroundImage: `url(${person.image_url ? person.image_url : ''})`}}>
            <div className="m-h-overlay" />
            <div className="modal-controls">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <Icon
                  font="MaterialCommunityIcons"
                  name="close-circle"
                  color="#ffffff"
                  size={35}
                />
              </button>
            </div>

            <div className="person-image">
              <img
                src={person.image_url || defaultPerson}
                alt="person-img"
              />
            </div>
          </div>

          <div className="modal-body">
            <div className="person-n-r">
              <p className="p-name">{ person.name }</p>
              { person.role && <p className="p-role">{ person.role }</p>}
              <p className="p-bio multiline-text">{ person.bio }</p>
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

              { person.twitter_handle && person.twitter_handle.length ? (
                <a href={person.twitter_handle} target="_blank" rel="noopener noreferrer">
                  <Icon
                    name="twitter-box"
                    font="MaterialCommunityIcons"
                    color="#00c3ff"
                    size={32}
                  />
                </a>
              ) : null }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

PersonModal.propTypes = {
  id: PropTypes.string.isRequired,
  person: PropTypes.object.isRequired,
};

export default PersonModal;
