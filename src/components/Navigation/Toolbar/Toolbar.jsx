import React from 'react';
import PropTypes from 'prop-types';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.scss';

const toolbar = ({ drawerToggleClicked, isAuth }) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className={classes.Title}>
      <span><strong>FordPass</strong></span>
      <span>Developer Portal</span>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems
        isAuthenticated={isAuth}
        isSideDrawer={false}
      />
    </nav>
  </header>
);

toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default toolbar;
