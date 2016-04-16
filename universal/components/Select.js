import React, { PropTypes } from 'react';

function Select({ value, options, label, onChange }) {
  return (
    <span className="select">
      <span className="select__label">{label}</span>{' '}
      <span className="select__select">
        <select
          onChange={e => onChange(e.target.value)}
          value={value}>
          <option disabled value="">-- select --</option>
          {
            options.map(option =>
            <option value={option} key={option}>
              {option}
            </option>)
          }
        </select>
      </span>
    </span>
  );
}

Select.propTypes = {
  value: React.PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired
};


export default Select;
