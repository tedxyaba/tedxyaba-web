import React, { useState } from 'react';
import './styles.scss';
import SubHeader from '../layout/SubHeader';
import SelectDropdown from '../SelectDropdown';

const SearchAndFilters = ({ data, searchPlaceholder }) => {
  const [categorySort, setCategorySort] = useState(null);
  const [sortYear, setSortYear] = useState(null);
  const [searchText, setSearchText] = useState('');

  const categoriesSortData = [
    {value: 'all', label: 'ALL'},
    {value: 'salon', label: 'Salon Series'},
    {value: 'virtual', label: 'Virtual Series'},
    {value: 'uncategorized', label: 'Uncategorized'},
  ];

  const yearsSortData = [
    {value: 'all', label: 'ALL'},
    {value: '2020', label: '2020'},
    {value: '2019', label: '2019'},
    {value: '2018', label: '2018'},
    {value: '2017', label: '2017'},
  ];

  return (
    <SubHeader className="sorts-and-filters">
      <div className="row justify-content-center">
        <div className="columns col-md-12 col-lg-10">
          <div className="category">
            <SelectDropdown
              label="Sort by"
              preSelected={categoriesSortData[0]}
              data={categoriesSortData}
              onSelect={setCategorySort}
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
              onChange={e => setSearchText(e.target.value)}
              placeholder={searchPlaceholder}
            />
          </div>
        </div>
      </div>
    </SubHeader>
  )
};

export default SearchAndFilters;
