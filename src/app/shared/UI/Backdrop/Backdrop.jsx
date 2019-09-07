/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.scss';

const backdrop = ({ show, clicked }) => (
  show ? <div className={classes.Backdrop} onClick={clicked} /> : null
);

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};
export default backdrop;
