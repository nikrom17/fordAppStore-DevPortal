/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.scss';

const button = ({
  disabled, clicked, btnType, children, type,
}) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    disabled={disabled}
    onClick={clicked}
    type={type}
  >
    {children}

  </button>
);

button.propTypes = {
  btnType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default button;
