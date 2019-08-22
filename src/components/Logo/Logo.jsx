import React from 'react';
import PropTypes from 'prop-types';

import fordLogo from '../../assets/images/ford_logo.svg';
import classes from './Logo.module.scss';

const logo = (props) => {
  const { height } = props;
  return (
    <div className={classes.Logo} style={{ height }}>
      <img src={fordLogo} alt="Ford Logo" />
    </div>
  );
};

logo.propTypes = {
  height: PropTypes.string.isRequired,
};

export default logo;
