import React from 'react';

const textInputRender = ({
  config, controls, className, inputId, onChange,
}) => {
  const { type, placeholder } = config;
  const { value } = controls;
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
