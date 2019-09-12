import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { validateValue } from 'utils/utility';
import styles from './select.module.scss';

const Select = ({
  config, inputId, stateValue, validation,
}) => {
  const [value, setValue] = useState(stateValue || '');
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (isEdited) {
      setIsValid(validateValue(newValue, validation));
    }
  };

  const handleOnBlur = () => {
    setIsEdited(true);
    setIsValid(validateValue(value, validation));
  };

  const appliedClasses = isEdited && !isValid
    ? [styles.input, styles.invalid] : [styles.input];
  const { options } = config;
  return (
    <select
      className={appliedClasses.join(' ')}
      name={inputId}
      onBlur={handleOnBlur}
      onChange={(event) => handleChange(event.target.value)}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  config: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.array],
  )).isRequired,
  inputId: PropTypes.string.isRequired,
  stateValue: PropTypes.string,
  validation: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.bool, PropTypes.string],
  )).isRequired,
};

Select.defaultProps = {
  stateValue: null,
};

export default Select;
