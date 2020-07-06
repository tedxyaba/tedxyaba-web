import React, { useState, useEffect } from 'react';
import './styles.scss';
import Section from '../layout/Section';
import { YoutubeThumbnail } from '../YoutubeEmbed';
import moment from 'moment';
import { YoutubeLogo } from '../../utils/images';
import SearchAndFilters from '../SearchAndFilters';
import Paginate from '../Paginate';
import { handleMoreTalks, setCurrentPage, handleSearchAndFilterTalks } from '../../actions/talks';
import { connect } from 'react-redux';
import { TALKS_PER_PAGE } from '../../utils/configs';

const Talks = ({ talksData, dispatch }) => {
  const [talks, setTalks] = useState([]);
  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    setTalks(talksData[talksData.current_page])
  }, [talksData])

  const filterTalks = (params) => {
    setFilterParams(params);
    dispatch(handleSearchAndFilterTalks(params))
  };

  const onLoadMoreTalks = (page) => {
    if (talksData[page]) {
      dispatch(setCurrentPage(page))
    } else {
      dispatch(handleMoreTalks(page, filterParams))
    }
  }

  return (
    <div className="talks">
      <SearchAndFilters
        type="talks"
        onFilter={filterTalks}
        searchPlaceholder="Search talks..."
      />

      <Section className="all-talks">
        <div className="row">
          { talks.length === 0 && (
            <div className="col-md-12 no-results">
              <p>No talks found for your filters criteria.</p>
            </div>
          ) }

          { talks.map(talk => (
            <a href={talk.video_url} target="_blank" rel="noopener noreferrer" key={talk.id} className="item-col col-sm-6 col-md-6 col-lg-4">
              <div className="talk-item">
                <div className="top-bar">
                  <YoutubeLogo />
                  <div>{talk.video_duration && talk.video_duration.match(/\d+/g).join(':')}</div>
                </div>

                <YoutubeThumbnail url={talk.video_url} />

                <div className="overlay">
                  <p className="name-date">
                    {talk.speaker && talk.speaker.name}
                    { talk.date && <span className="date-year"> - {moment(talk.date).year()}</span> }
                  </p>
                  <p className="topic">{talk.topic}</p>
                </div>
              </div>
            </a>
          )) }

          { talks.length > 0 && (
            <div className="col-12 mt-5">
              <Paginate
                total={talksData.total_count || 0}
                currentPage={talksData.current_page || 0}
                perPage={TALKS_PER_PAGE}
                onPrev={onLoadMoreTalks}
                onNext={onLoadMoreTalks}
                loading={talksData.loading}
              />
            </div>
          )}
        </div>
      </Section>
    </div>
  )
};

export default connect()(Talks);
