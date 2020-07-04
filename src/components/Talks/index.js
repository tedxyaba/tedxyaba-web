import React, { useState, useEffect } from 'react';
import './styles.scss';
import Section from '../layout/Section';
import { YoutubeThumbnail } from '../YoutubeEmbed';
import moment from 'moment';
import { YoutubeLogo } from '../../utils/images';
import SearchAndFilters from '../SearchAndFilters';
import Paginate from '../Paginate';
import { handleMoreTalks, setCurrentPage } from '../../actions/talks';
import { connect } from 'react-redux';
import { TALKS_PER_PAGE } from '../../utils/configs';

const Talks = ({ talksData, dispatch }) => {
  const [talks, setTalks] = useState([]);
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    setTalks(talksData[talksData.current_page])
  }, [talksData])

  const filterTalks = (data) => {
    setFiltered(data);
  };

  const filteredArrays = () => {
    if (filtered === null) return talks;

    return talks.filter(talk => {
      return filtered.findIndex(f => f.id === talk.id) >= 0;
    })
  };

  const onLoadMoreTalks = (page) => {
    setTalks(talksData[page])
    
    if (talksData[page]) {
      dispatch(setCurrentPage(page))
    } else {
      dispatch(handleMoreTalks(page))
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
          { (filtered && filtered.length === 0) && (
            <div className="col-md-12 no-results">
              <p>No talks found for your filters criteria.</p>
            </div>
          ) }

          { filteredArrays().map(talk => (
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

          { filteredArrays().length > 0 && (
            <div className="col-12 mt-5">
              <Paginate
                total={talksData.total_count}
                currentPage={talksData.current_page}
                perPage={TALKS_PER_PAGE }
                onPrev={onLoadMoreTalks}
                onNext={onLoadMoreTalks}
              />
            </div>
          )}
        </div>
      </Section>
    </div>
  )
};

export default connect()(Talks);
