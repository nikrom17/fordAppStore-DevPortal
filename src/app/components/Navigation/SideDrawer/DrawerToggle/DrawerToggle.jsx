/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.module.scss';

const drawerToggle = ({ clicked }) => (
  <div onClick={clicked} className={classes.DrawerToggle} type="button">
    <div />
    <div />
    <div />
  </div>
);

drawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default drawerToggle;
