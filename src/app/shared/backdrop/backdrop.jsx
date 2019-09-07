/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './backdrop.module.scss';

const Backdrop = ({ show, clicked }) => (
  show ? <div className={styles.Backdrop} onClick={clicked} /> : null
);

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
