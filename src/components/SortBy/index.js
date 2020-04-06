import React, { useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SortBy = ({ data, onSelect, placeholder }) => {
  const [selected, setSelected] = useState(null);

  const handleOnSelect = item => {
    setSelected(item)
    if (onSelect) onSelect(item);
  }

  return (
    <div className="sortby">
      <p>Sort by</p>
      <Select
        id="sortby-select"
        className="sortby-select"
        classNamePrefix="sortby"
        value={selected}
        options={data}
        onChange={handleOnSelect}
        placeholder={placeholder || 'Select...'}
        isSearchable={false}
      />
    </div>
  )
};

SortBy.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SortBy;