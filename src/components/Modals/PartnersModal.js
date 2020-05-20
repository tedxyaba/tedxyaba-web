import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Icon from 'react-web-vector-icons';

const PartnersModal = ({ id, data }) => {
  return (
    <div className="modal tedxyaba-partners-modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Title`} aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-controls">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <Icon
                  font="MaterialCommunityIcons"
                  name="close-circle"
                  color="#474350"
                  size={35}
                />
              </button>
            </div>

            <div className="partner-image">
              <img
                src={data.image_url}
                alt="partner-img"
              />
            </div>
          </div>

          <div className="modal-body">
            { data.bio && <p className="p-bio">{ data.bio }</p>}

            <div className="partner-links">
              { data.url && data.url.length ? (
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                  <Icon
                    name="link"
                    font="Entypo"
                    color="#af0000"
                    size={35}
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

PartnersModal.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default PartnersModal;
