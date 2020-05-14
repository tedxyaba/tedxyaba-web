import React, { useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectDropdown = ({ data, onSelect, label, placeholder, isSearchable, mode, preSelected }) => {
  const [selected, setSelected] = useState(null);

  const handleOnSelect = item => {
    setSelected(item)
    if (onSelect) onSelect(item);
  }

  return (
    <div className="tedxyaba-dropdown">
      { label && <p>{label}</p> }

      <Select
        id="tedxyaba-dropdown-select"
        className={`tedxyaba-dropdown-select ${mode}`}
        classNamePrefix="tedxyaba-dropdown"
        value={selected || preSelected}
        options={data}
        onChange={handleOnSelect}
        placeholder={placeholder || 'Select...'}
        isSearchable={isSearchable}
      />
    </div>
  )
};

SelectDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
  mode: PropTypes.oneOf(['dark', 'white', 'transparent']),
};

SelectDropdown.defaultProps = {
  isSearchable: false,
  mode: 'dark',
}

export default SelectDropdown;