import React from 'react';
import classes from './Input.module.css';

const input = ({
  elementType, invalid, shouldValidate, touched,
  headerText, readOnly, changed, value, elementConfig,
  src, alt, label,
}) => {
  let inputElement = null;
  let header = null;
  const inputClasses = [classes.InputElement];
  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }
  if (headerText) {
    header = <p className={classes.Header}>{headerText}</p>;
  }
  if (elementType === 'img') {
    inputClasses.push(classes.Image);
  } else if (elementType === 'textarea') {
    inputClasses.push(classes.Textarea);
  }

  switch (elementType) {
    case ('input'):
      inputElement = (
        <input
          readOnly={readOnly}
          className={inputClasses.join(' ')}
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case ('file'):
      inputElement = (
        <input
          readOnly={readOnly}
          className={inputClasses.join(' ')}
          onChange={changed}
          {...elementConfig}
          value={value.value}
        />
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          readOnly={readOnly}
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          onChange={changed}
          readOnly={readOnly}
          value={value}
        >
          {elementConfig.options.map((option) => (
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
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      <div>
        {header}
        {inputElement}
      </div>
    </div>
  );
};

export default input;
