import React from 'react';

const textInputRender = ({
  config, controls, className, inputId, onChange,
}) => {
  const { type, placeholder } = config;
  const { value } = controls;
  console.log(value);
  let input;
  switch (type) {
    case ('password'):
    case ('email'):
      input = (
        <input
          className={className}
          placeholder={placeholder}
          type={type}
          onChange={(event) => onChange(event, inputId)}
          value={value}
        />
      );
      break;
    default:
      input = null;
  }
  return input;
};

export default textInputRender;
