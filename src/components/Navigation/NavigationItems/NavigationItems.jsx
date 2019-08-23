import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
  const { isAuthenticated } = props;
  const inputClasses = [classes.NavigationItems];
  return (
    <ul className={inputClasses}>
      <NavigationItem link="/">Home</NavigationItem>
      {isAuthenticated
        ? <NavigationItem link="/accountDetails">Account Details</NavigationItem> : null}
      {isAuthenticated
        ? <NavigationItem link="/logout" active>Logout</NavigationItem>
        : <NavigationItem link="/auth">Login</NavigationItem>}
    </ul>
  );
};

navigationItems.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(navigationItems);
