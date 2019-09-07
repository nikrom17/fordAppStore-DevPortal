import React, { useState } from 'app/shared/inputs/select/react';

import { validateValue } from '../../../../../shared/utility';
import styles from './select.module.scss';

const Select = ({
  config, inputId, stateValue, validation,
}) => {
  const [value, setValue] = useState(stateValue || '');
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    // if (isEdited) {
    //   setIsValid(validateValue(newValue, validation));
    // }
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
      onChange={handleChange}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
  );
};

export default Select;
