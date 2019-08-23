import React from 'react';
import PropTypes from 'prop-types';

import classes from './iconButton.module.scss';


const iconButton = ({ iconComponent }) => (
  <button type="button" className={classes.button}>
    {iconComponent}
  </button>
);

iconButton.propTypes = {
  iconComponent: PropTypes.node.isRequired,
};

export default iconButton;
