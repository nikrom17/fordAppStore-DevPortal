/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.scss';

const button = ({
  disabled, clicked, noMargin, title, type,
}) => (
  <button
    className={noMargin ? [classes.button, classes.noMargin].join(' ') : classes.button}
    disabled={disabled}
    onClick={clicked}
    type={type}
  >
    {title}
  </button>
);

button.propTypes = {
  clicked: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  noMargin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

button.defaultProps = {
  disabled: false,
  noMargin: false,
};

export default button;
