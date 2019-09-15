import React, { useState } from 'react';
import { validateValue } from 'utils/utility';

import styles from './textInputRender.module.scss';

const TextInputRender = ({
  config, inputId, stateValue, validation,
}) => {
  const [value, setValue] = useState('');
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
          className={appliedClasses.join(' ')}
          name={inputId}
          onBlur={handleOnBlur}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          value={stateValue || value}
        />
      );
      break;
    default:
      input = null;
  }
  return (input);
};

TextInputRender.defaultProps = {
  stateValue: '',
};

export default TextInputRender;
