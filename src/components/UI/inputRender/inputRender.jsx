import React from 'react';

import TextInputRender from './inputs/textInputs/textInputRender';
import classes from './inputRender.module.scss';

const input = ({
  config, controls, element, inputId, onChange, readOnly,
}) => {
  const {
    headerText, shouldValidate, options, alt, src,
  } = config;
  const { touched, valid, value } = controls;
  let inputElement = null;
  const header = headerText ? <p className={classes.header}>{headerText}</p> : null;
  const inputClasses = [classes.InputElement];
  // if (!valid && shouldValidate && touched) {
  //   inputClasses.push(classes.valid);
  // }
  // Move this to img component
  if (element === 'img') {
    inputClasses.push(classes.Image);
  } else if (element === 'textarea') {
    inputClasses.push(classes.Textarea);
  }

  switch (element) {
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
          readOnly={readOnly}
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
          readOnly={readOnly}
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
          readOnly={readOnly}
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
          readOnly={readOnly}
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
