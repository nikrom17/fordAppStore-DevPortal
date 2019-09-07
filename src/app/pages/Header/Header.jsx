import React from 'app/pages/header/react';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.title}>
      <span><strong>FordPass</strong></span>
      <span>Developer Portal</span>
    </div>
  </header>
);


export default Header;
