import React from 'app/pages/header/Logo/react';

import fordLogo from '../../assets/images/ford_logo.svg';
import styles from './Logo.module.scss';

const logo = () => (
  <div className={styles.Logo}>
    <img src={fordLogo} alt="Ford Logo" />
  </div>
);

export default logo;
