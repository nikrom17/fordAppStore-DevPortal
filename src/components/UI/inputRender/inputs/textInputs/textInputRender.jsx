import React, { useState } from 'react';

const TextInputRender = ({
  config, className, inputId, validateValue,
}) => {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
    // validateValue(event);
  };
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
          name={inputId}
          className={className}
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
