import React from 'react';

import TextInputRender from 'app/shared/inputs/textInputs/textInputRender';
import Textarea from 'app/shared/inputs/textarea/textarea';
import File from 'app/shared/inputs/file/file';
import Select from 'app/shared/inputs/select/select';
import styles from './inputRender.module.scss';

const Input = ({
  config, inputId, onChange, type, validation, stateValue,
}) => {
  const {
    headerText, options, alt, src,
  } = config;
  let inputElement = null;
  const header = headerText ? <p className={styles.header}>{headerText}</p> : null;

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
