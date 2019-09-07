import React from 'react';

import fordLogo from '../../assets/images/ford_logo.svg';
import classes from './Logo.module.scss';

const logo = () => (
  <div className={classes.Logo}>
    <img src={fordLogo} alt="Ford Logo" />
  </div>
);

export default logo;
