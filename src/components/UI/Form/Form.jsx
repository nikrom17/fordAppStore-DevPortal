import React from 'react';
import PropTypes from 'prop-types';

import classes from './Form.module.scss';

const form = ({ children }) => (
  <div className={classes.Form}>
    {children}
  </div>
);

form.propTypes = {
  children: PropTypes.node.isRequired,
};

export default form;
