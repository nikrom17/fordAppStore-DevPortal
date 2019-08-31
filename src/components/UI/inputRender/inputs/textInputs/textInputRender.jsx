import React, { useState } from 'react';
import { validateValue } from '../../../../../shared/utility';

import classes from './textInputRender.module.scss';

const TextInputRender = ({
  config, inputId, validation, setFormValid,
}) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const handleChange = (newValue) => {
    setValue(newValue);
    if (isEdited) {
      setIsValid(validateValue(newValue, validation));
      setFormValid(inputId, isValid);
    }
  };

  const handleOnBlur = () => {
    setIsEdited(true);
    setIsValid(validateValue(value, validation));
    setFormValid(inputId, isValid);
  };

  const appliedClasses = isEdited && !isValid
    ? [classes.input, classes.invalid] : [classes.input];
  const { type, placeholder } = config;
  let input;
  switch (type) {
    case ('password'):
    case ('email'):
    case ('phone'):
    case ('url'):
    case ('text'):
      input = (
        <input
          onBlur={handleOnBlur}
          name={inputId}
          className={appliedClasses.join(' ')}
          placeholder={placeholder}
          type={type}
          onChange={(event) => handleChange(event.target.value)}
          value={value}
        />
      );
      break;
    default:
      input = null;
  }
  return (input);
};

export default TextInputRender;
