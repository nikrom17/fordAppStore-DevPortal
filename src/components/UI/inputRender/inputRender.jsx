import React from 'react';

import TextInputRender from './inputs/textInputs/textInputRender';
import classes from './inputRender.module.scss';

const input = ({
  config, inputId, onChange, type,
}) => {
  const {
    headerText, options, alt, src,
  } = config;
  let inputElement = null;
  const header = headerText ? <p className={classes.header}>{headerText}</p> : null;
  const inputClasses = [classes.invalid, classes.inputElement];
  if (inputId === 'img') {
    inputClasses.push(classes.image);
  } else if (inputId === 'textarea') {
    inputClasses.push(classes.textarea);
  }

  switch (type) {
    case ('input'):
      inputElement = (
        <TextInputRender
          inputClasses={inputClasses}
          config={config}
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
        />
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          onChange={onChange}
        />
      );
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
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
