import React, { useState } from 'react';
import { validateValue } from '../../../../../shared/utility';

import classes from '../../inputRender.module.scss';

const TextInputRender = ({
  config, inputClasses, inputId,
}) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (isEdited) {
      setIsValid(validateValue(event));
    }
  };

  const handleOnBlur = () => {
    setIsEdited(true);
    setIsValid(validateValue(value));
  };

  const appliedClasses = isEdited && !isValid ? [...inputClasses, classes.invalid] : inputClasses;
  const { type, placeholder } = config;
  let input;
  console.log(value);
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
          onChange={(event) => handleChange(event)}
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
