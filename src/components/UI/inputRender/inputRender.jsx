import React from 'react';

import TextInputRender from './inputs/textInputs/textInputRender';
import Textarea from './inputs/textarea/textarea';
import File from './inputs/file/file';
import Select from './inputs/select/select';
import classes from './inputRender.module.scss';

const Input = ({
  config, inputId, onChange, type, validation, stateValue,
}) => {
  const {
    headerText, options, alt, src,
  } = config;
  let inputElement = null;
  const header = headerText ? <p className={classes.header}>{headerText}</p> : null;

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
        <File
          config={config}
          inputId={inputId}
          onChange={onChange}
          validation={validation}
          stateValue={stateValue}
        />
      );
      break;
    case ('textarea'):
      inputElement = (
        <Textarea
          config={config}
          inputId={inputId}
          onChange={onChange}
          validation={validation}
          stateValue={stateValue}
        />
      );
      break;
    case ('select'):
      inputElement = (
        <Select
          config={config}
          inputId={inputId}
          onChange={onChange}
          validation={validation}
          stateValue={stateValue}
        />
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
  }

  return (
    <div>
      {inputElement}
      {header}
    </div>
  );
};

export default Input;
