import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
  const { isSideDrawer, isAuthenticated } = props;
  const inputClasses = [classes.NavigationItems];
  if (isSideDrawer) {
    inputClasses.push(classes.SideDrawer);
  }
  return (
    <ul className={inputClasses}>
      <NavigationItem link="/" isSideDrawer={isSideDrawer}>Home</NavigationItem>
      {isAuthenticated
        ? <NavigationItem link="/accountDetails" isSideDrawer={isSideDrawer}>Account Details</NavigationItem> : null}
      {isAuthenticated
        ? <NavigationItem link="/logout" active>Logout</NavigationItem>
        : <NavigationItem link="/auth" isSideDrawer={isSideDrawer}>Login</NavigationItem>}
    </ul>
  );
};

navigationItems.propTypes = {
  isSideDrawer: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(navigationItems);
