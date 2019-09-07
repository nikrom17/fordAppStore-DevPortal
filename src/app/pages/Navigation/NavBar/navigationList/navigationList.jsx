import React from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faCog, faSignOutAlt, faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import styles from './navigationList.module.scss';
import NavigationItem from './navigationItem/navigationItem';

library.add(faHome, faCog, faSignOutAlt, faSignInAlt);

const navigationItems = (props) => {
  const { isAuthenticated } = props;
  const inputClasses = [styles.NavigationItems];
  return (
    <ul className={inputClasses}>
      <NavigationItem link="/" tooltip="home">
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon="home" className={styles.icon} />
        </div>
      </NavigationItem>
      {isAuthenticated
        ? (
          <NavigationItem link="/accountDetails" tooltip="Account Details">
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon="cog" className={styles.icon} />
            </div>
          </NavigationItem>
        ) : null}
      {isAuthenticated
        ? (
          <NavigationItem link="/logout" active tooltip="logout">
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon="sign-out-alt" className={styles.icon} />
            </div>
          </NavigationItem>
        )
        : (
          <NavigationItem link="/auth" tooltip="Login">
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon="sign-in-alt" className={styles.icon} />
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
