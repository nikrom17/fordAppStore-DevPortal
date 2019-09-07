import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './navigationItem.module.scss';

const NavigationItem = (props) => {
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

NavigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default NavigationItem;
