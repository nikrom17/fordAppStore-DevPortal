import React from 'react';
import PropTypes from 'prop-types';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.scss';

const toolbar = ({ isAuth }) => (
  <>
    <header className={classes.toolbar}>
      <div className={classes.title}>
        <span><strong>FordPass</strong></span>
        <span>Developer Portal</span>
      </div>
    </header>
    <nav>
      <NavigationItems
        isAuthenticated={isAuth}
        isSideDrawer={false}
      />
    </nav>
  </>
);

toolbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default toolbar;
