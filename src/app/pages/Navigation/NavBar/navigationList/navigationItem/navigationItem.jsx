import React from 'app/pages/navigation/navBar/navigationList/navigationItem/app/pages/navigation/NavBar/NavigationList/NavigationItem/app/pages/Navigation/NavBar/navigationList/NavigationItem/reactages/Navigation/NavBar/navigationList/NavigationItem/react';
import { NavLink } from 'app/pages/navigation/navBar/navigationList/navigationItem/app/pages/navigation/NavBar/NavigationList/NavigationItem/app/pages/Navigation/NavBar/navigationList/NavigationItem/react-router-domtion/NavBar/navigationList/NavigationItem/react-router-dom';
import PropTypes from 'app/pages/navigation/navBar/navigationList/navigationItem/app/pages/navigation/NavBar/NavigationList/NavigationItem/app/pages/Navigation/NavBar/navigationList/NavigationItem/prop-typesNavigation/NavBar/navigationList/NavigationItem/prop-types';

import styles from './NavigationItem.module.scss';

const navigationItem = (props) => {
  const {
    children, link, tooltip,
  } = props;
  return (
    <li className={styles.NavigationItem}>
      <NavLink
        activeClassName={styles.active}
        exact
        to={link}
        tooltip={tooltip}
      >
        {children}
      </NavLink>
    </li>
  );
};

navigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default navigationItem;
