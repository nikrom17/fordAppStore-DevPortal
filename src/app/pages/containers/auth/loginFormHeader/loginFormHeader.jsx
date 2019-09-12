import React from 'react';
import PropTypes from 'prop-types';

import classes from './loginFormHeader.module.scss';

const loginFormHeader = ({ isSignup }) => (
  <>
    <p className={classes.name}>Ford</p>
    <p className={classes.signIn}>{isSignup ? 'Please create an account' : 'Please sign in'}</p>
  </>
);

loginFormHeader.propTypes = {
  isSignup: PropTypes.bool.isRequired,
};

export default loginFormHeader;
