import React from 'react';
import PropTypes from 'prop-types';

import styles from './hyperlinkButton.module.scss';

const Button = ({
  disabled, onClick, noMargin, title,
}) => (
  <button
    className={noMargin ? [styles.button, styles.noMargin].join(' ') : styles.button}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {title}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  noMargin: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  noMargin: false,
};

export default Button;
