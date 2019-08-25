import React from 'react';
import PropTypes from 'prop-types';

import classes from './Form.module.scss';

const form = ({ buttons, inputs }) => (
  <form className={classes.Form}>
    {inputs}
    {buttons}
  </form>
);

form.propTypes = {
  buttons: PropTypes.node.isRequired,
  inputs: PropTypes.node.isRequired,
};

export default form;
