/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './hyperlinkButton.module.scss';

const Button = ({
  disabled, clicked, noMargin, title, type,
}) => (
  <button
    className={noMargin ? [styles.button, styles.noMargin].join(' ') : styles.button}
    disabled={disabled}
    onClick={clicked}
    type={type}
  >
    {title}
  </button>
);

Button.propTypes = {
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  noMargin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Button.defaultProps = {
  clicked: () => {},
  disabled: false,
  noMargin: false,
};

export default Button;
