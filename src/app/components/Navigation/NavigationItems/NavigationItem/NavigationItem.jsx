import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.scss';

const navigationItem = (props) => {
  const {
    children, link, tooltip,
  } = props;
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        activeClassName={classes.active}
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
