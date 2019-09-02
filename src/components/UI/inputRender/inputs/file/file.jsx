import React, { useState } from 'react';

import { validateValue } from '../../../../../shared/utility';
import classes from './file.module.scss';

const File = ({
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
    ? [classes.input, classes.invalid] : [classes.input];
  return (
    <input
      className={appliedClasses.join(' ')}
      type="file"
      name={inputId}
      onBlur={handleOnBlur}
      onChange={(event) => handleChange(event.target.value)}
      value={value}
    />
  );
};

export default File;
