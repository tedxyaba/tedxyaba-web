import React, { useState, useEffect } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Icon from 'react-web-vector-icons';
import ReactPaginate from 'react-paginate';

const range = (start, stop, step) => (
  Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
);

const Paginate = ({ total, perPage, onPageChange, currentPage, loading }) => {
  const [current, setCurrent] = useState(0);
  const pages = Math.ceil(total/perPage)

  useEffect(() => {
    setCurrent(currentPage)
  }, [currentPage])

  const onPageClick = (selector) => {
    const page = selector.selected + 1
    setCurrent(page)
    onPageChange(page)
  }

  return (
    <>
    {loading && (
      <div className="loading-dots">
        <div className="dot-carousel" />
      </div>
    )}

    <ReactPaginate
      previousLabel={
        <Icon
          font="Entypo"
          name="chevron-thin-left"
          color="#0a0a0a"
          size={20}
        />
      }
      nextLabel={
        <Icon
          font="Entypo"
          name="chevron-thin-right"
          color="#0a0a0a"
          size={20}
        />
      }
      breakLabel="&hellip;"
      breakClassName={'dots'}
      pageCount={pages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      initialPage={current}
      onPageChange={onPageClick}
      containerClassName={'paginate'}
      pageClassName={'page'}
      pageLinkClassName={'page-link'}
      activeClassName={'current'}
      previousClassName={'ctrl p-left'}
      nextClassName={'ctrl p-right'}
    />


    {/* <div className="paginate">
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
    </div> */}
    </>
  )
}

Paginate.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  loading: PropTypes.bool,
};

Paginate.defaultProps = {
  loading: false
}

export default Paginate;
