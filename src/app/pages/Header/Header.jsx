import React from 'react';
import styles from './header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.title}>
      <span className={styles.bold}>FordPass</span>
      <span>Developer Portal</span>
    </div>
  </header>
);

export default Header;
