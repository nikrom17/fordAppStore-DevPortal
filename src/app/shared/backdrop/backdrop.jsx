/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'app/shared/backdrop/app/shared/Backdrop/react';
import PropTypes from 'app/shared/backdrop/app/shared/Backdrop/prop-types';

import styles from './Backdrop.module.scss';

const backdrop = ({ show, clicked }) => (
  show ? <div className={styles.Backdrop} onClick={clicked} /> : null
);

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};
export default backdrop;
