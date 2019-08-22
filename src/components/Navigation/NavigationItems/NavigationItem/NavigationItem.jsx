import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.scss';

const navigationItem = (props) => {
  const { link, isSideDrawer, children } = props;
  return (
    <li className={isSideDrawer ? classes.SideDrawer : classes.NavigationItem}>
      <NavLink
        to={link}
        exact
        activeClassName={classes.active}
      >
        {children}

      </NavLink>
    </li>
  );
};

navigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  isSideDrawer: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default navigationItem;
