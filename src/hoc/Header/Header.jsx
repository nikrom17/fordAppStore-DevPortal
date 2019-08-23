import React from 'react';
import classes from './Header.module.scss';

const Header = () => (
  <header className={classes.header}>
    <div className={classes.title}>
      <span><strong>FordPass</strong></span>
      <span>Developer Portal</span>
    </div>
  </header>
);


export default Header;
