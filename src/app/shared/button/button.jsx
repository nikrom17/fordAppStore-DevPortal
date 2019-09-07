/* eslint-disable react/button-has-type */
import React from 'app/shared/button/app/shared/Button/react';
import PropTypes from 'app/shared/button/app/shared/Button/prop-types';

import styles from './Button.module.scss';

const button = ({
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

button.propTypes = {
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  noMargin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

button.defaultProps = {
  clicked: () => {},
  disabled: false,
  noMargin: false,
};

export default button;
