import React, { useState, useEffect } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import SubHeader from '../layout/SubHeader';
import SelectDropdown from '../SelectDropdown';
import fetchApi from '../../utils/fetch-api';

const SearchAndFilters = ({type, onFilter, searchPlaceholder }) => {
  const [searching, setSearching] = useState(false);
  const [sortCategory, setSortCategory] = useState(null);
  const [sortYear, setSortYear] = useState(null);
  const [searchText, setSearchText] = useState('');

  const categories = ['Main Event', 'TEDxYabaSalon', 'TEDxYabaTeen', 'TEDxYabaWomen', 'TEDxYabaYouth'];

  const categoriesSortData = [
    {value: 'all', label: 'ALL'},
    ...categories.map(c => ({value: c, label: c}))
  ];

  const yearsSortData = [
    {value: 'all', label: 'ALL'},
    {value: '2020', label: '2020'},
    {value: '2019', label: '2019'},
    {value: '2018', label: '2018'},
    {value: '2017', label: '2017'},
  ];

  const cleanData = (data) => {
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] === 'all' || data[key] === null || data[key] === undefined) {
        delete data[key]
      }
    });

    return data
  };

  const filterData = async (search, year, category) => {
    setSearching(true);

    const params = {
      event_year: year && year.value,
      category: category && category.value
    };

    if (type === 'events') {
      params.event_title = search
    } else {
      params.query = search
    }

    const filters = cleanData(params);

    try {
      const response = await fetchApi.getData(`/${type}`, {filters});
      const data = await response.json();
      if (onFilter) onFilter(data);
      setSearching(false);
    } catch (error) {
      setSearching(false);
      console.log(`Error filtering ${type}.`, error)
    }
  };

  const onSearchKeyDown = (e) => {
    setSearchText(e.target.value);
    if (e.key === 'Enter') {
      filterData(searchText, sortYear, sortCategory)
    }
  }

  useEffect(() => {
    if (sortCategory || sortYear) {
      filterData(searchText, sortYear, sortCategory)
    }
  }, [sortCategory, sortYear])

  return (
    <SubHeader className="sorts-and-filters">
      <div className="row justify-content-center">
        <div className="columns col-md-12 col-lg-9 col-xl-8">
          <div className="category">
            <SelectDropdown
              label="Sort by"
              preSelected={categoriesSortData[0]}
              data={categoriesSortData}
              onSelect={setSortCategory}
              mode="white"
            />
          </div>

          <div className="years">
            <SelectDropdown
              label="Year"
              preSelected={yearsSortData[0]}
              data={yearsSortData}
              onSelect={setSortYear}
              mode="white"
            />
          </div>

          <div className="search">
            <input
              id="search-text"
              type="text"
              className="form-control search-input-control"
              value={searchText}
              onChange={onSearchKeyDown}
              onKeyDown={onSearchKeyDown}
              placeholder={searchPlaceholder}
            />
          </div>
        </div>

        { searching && <div className="col-md-12">
          <div className="is-searching spinner-grow" role="status" />
        </div>}
      </div>
    </SubHeader>
  )
};

SearchAndFilters.propTypes = {
  categories: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
};

export default SearchAndFilters;
