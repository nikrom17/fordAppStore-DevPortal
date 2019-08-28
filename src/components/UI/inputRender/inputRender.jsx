import React from 'react';

import TextInputRender from './inputs/textInputs/textInputRender';
import classes from './inputRender.module.scss';

const input = ({
  config, controls, inputId, onChange, type,
}) => {
  const {
    headerText, options, alt, src,
  } = config;
  const { value } = controls;
  let inputElement = null;
  const header = headerText ? <p className={classes.header}>{headerText}</p> : null;
  const inputClasses = [classes.InputElement];
  if (inputId === 'img') {
    inputClasses.push(classes.Image);
  } else if (inputId === 'textarea') {
    inputClasses.push(classes.Textarea);
  }

  switch (type) {
    case ('input'):
      inputElement = (
        <TextInputRender
          className={inputClasses.join(' ')}
          config={config}
          controls={controls}
          inputId={inputId}
          onChange={onChange}
        />
      );
      break;
    case ('file'):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          onChange={onChange}
          value={value.value}
        />
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          onChange={onChange}
          value={value}
        />
      );
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          onChange={onChange}
          value={value}
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
          className={inputClasses.join(' ')}
          src={src}
          alt={alt}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          onChange={onChange}
          value={value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      {header}
      {inputElement}
    </div>
  );
};

export default input;
