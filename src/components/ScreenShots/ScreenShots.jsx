import React from 'react';
import PropTypes from 'prop-types';

import classes from './ScreenShots.module.scss';

const ScreenShots = ({ imgKey, name }) => (
  <img
    className={classes.screenshots}
    src={imgKey}
    alt={name}
  />
);

ScreenShots.propTypes = {
  imgKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ScreenShots;
