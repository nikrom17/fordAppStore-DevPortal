import React from 'react';

import TextInputRender from './inputs/textInputs/textInputRender';
// import classes from './inputRender.module.scss';

const Input = ({
  config, inputId, onChange, type, validation, stateValue,
}) => {
  const {
    headerText, options, alt, src,
  } = config;
  let inputElement = null;
  const header = headerText ? <p>{headerText}</p> : null;

  switch (type) {
    case ('input'):
      inputElement = (
        <TextInputRender
          config={config}
          inputId={inputId}
          onChange={onChange}
          validation={validation}
          stateValue={stateValue}
        />
      );
      break;
    case ('file'):
      inputElement = (
        <input
          onChange={onChange}
        />
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea
          onChange={onChange}
        />
      );
      break;
    case ('select'):
      inputElement = (
        <select
          onChange={onChange}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case ('img'):
      inputElement = (
        <img
          src={src}
          alt={alt}
        />
      );
      break;
    default:
      inputElement = (
        <input
          onChange={onChange}
        />
      );
  }

  return (
    <div>
      {header}
      {inputElement}
    </div>
  );
};

export default Input;
