import React from 'react';

const textInputRender = ({
  config, className, inputId, onChange,
}) => {
  const { type, placeholder } = config;
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
        />
      );
      break;
    default:
      input = null;
  }
  return input;
};

export default textInputRender;
