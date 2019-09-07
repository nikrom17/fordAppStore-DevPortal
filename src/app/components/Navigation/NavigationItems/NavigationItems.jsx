import React from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faCog, faSignOutAlt, faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

library.add(faHome, faCog, faSignOutAlt, faSignInAlt);

const navigationItems = (props) => {
  const { isAuthenticated } = props;
  const inputClasses = [classes.NavigationItems];
  return (
    <ul className={inputClasses}>
      <NavigationItem link="/" tooltip="home">
        <div className={classes.iconContainer}>
          <FontAwesomeIcon icon="home" className={classes.icon} />
        </div>
      </NavigationItem>
      {isAuthenticated
        ? (
          <NavigationItem link="/accountDetails" tooltip="Account Details">
            <div className={classes.iconContainer}>
              <FontAwesomeIcon icon="cog" className={classes.icon} />
            </div>
          </NavigationItem>
        ) : null}
      {isAuthenticated
        ? (
          <NavigationItem link="/logout" active tooltip="logout">
            <div className={classes.iconContainer}>
              <FontAwesomeIcon icon="sign-out-alt" className={classes.icon} />
            </div>
          </NavigationItem>
        )
        : (
          <NavigationItem link="/auth" tooltip="Login">
            <div className={classes.iconContainer}>
              <FontAwesomeIcon icon="sign-in-alt" className={classes.icon} />
            </div>
          </NavigationItem>
        )}
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
