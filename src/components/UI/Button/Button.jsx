/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.scss';

const button = ({
  disabled, clicked, children, type,
}) => (
  <button
    className={[classes.Button]}
    disabled={disabled}
    onClick={clicked}
    type={type}
  >
    {children}

  </button>
);

button.propTypes = {
  disabled: PropTypes.bool,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

button.defaultProps = {
  disabled: false,
};

export default button;
