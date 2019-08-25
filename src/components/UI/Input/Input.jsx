import React from 'react';
import classes from './Input.module.scss';

const input = ({
  onChange, config, invalid, key, touched, type, value,
}) => {
  let inputElement = null;
  const header = config.header ? <p className={classes.header}>{header}</p> : null;
  const inputClasses = [classes.InputElement];
  if (invalid && shouldValidate && touched) 
    inputClasses.push(classes.Invalid);
  }
  // Move this to img component
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
      {header}
      {input}
    </div>
  );
};

export default input;
