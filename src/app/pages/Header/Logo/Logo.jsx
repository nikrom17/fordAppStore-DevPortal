import React from 'react';

import fordLogo from 'assets/images/ford_logo.svg';
import styles from './logo.module.scss';

const logo = () => (
  <div className={styles.logo}>
    <img src={fordLogo} alt="Ford Logo" />
  </div>
);

export default logo;
