import React, { useState, useEffect } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Icon from 'react-web-vector-icons';

const range = (start, stop, step) => (
  Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
);

const Paginate = ({ total, perPage, onPrev, currentPage, onNext, loading }) => {
  const [current, setCurrent] = useState(1);
  const pages = Math.ceil(total/perPage)

  useEffect(() => {
    setCurrent(currentPage)
  }, [currentPage])

  const onLeftClick = () => {
    const prev = current - 1;
    setCurrent(prev)
    onPrev(prev)
  }

  const onRightClick = () => {
    const next = current + 1;
    setCurrent(next)
    onNext(next)
  }

  const onPageClick = (page) => {
    setCurrent(page)
    onNext(page)
  }

  return (
    <>
    {loading && (
      <div className="loading-dots">
        <div className="dot-carousel" />
      </div>
    )}
    <div className="paginate">
      <button className="ctrl p-left" disabled={current <= 1} onClick={onLeftClick}>
        <Icon
          font="Entypo"
          name="chevron-thin-left"
          color="#0a0a0a"
          size={20}
        />
      </button>

      <div className="main">
        { range(1, pages, 1).map(page => {
          if (page <= 3) {
            return (
              <div key={page} onClick={() => onPageClick(page)} className={`page ${current === page ? 'current' : ''}`}>
                { page }
              </div>
            )
          }
        }) }
        {pages > 3 && (
          <>
          <div className="page dots">
            . . .
          </div>

          <div onClick={() => onPageClick(pages)} className={`page ${current === pages ? 'current' : ''}`}>
            {pages}
          </div>
          </>
        )}
      </div>

      <button className="ctrl p-right" disabled={current >= pages} onClick={onRightClick}>
        <Icon
          font="Entypo"
          name="chevron-thin-right"
          color="#0a0a0a"
          size={20}
        />
      </button>
    </div>
    </>
  )
}

Paginate.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Paginate.defaultProps = {
  loading: false
}

export default Paginate;