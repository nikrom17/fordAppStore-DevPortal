import React, { useState } from 'app/shared/inputs/textarea/react';

import { validateValue } from '../../../../../shared/utility';
import styles from './textarea.module.scss';

const Textarea = ({
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
  const { placeholder } = config;
  return (
    <textarea
      className={appliedClasses.join(' ')}
      name={inputId}
      onBlur={handleOnBlur}
      onChange={(event) => handleChange(event.target.value)}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Textarea;
