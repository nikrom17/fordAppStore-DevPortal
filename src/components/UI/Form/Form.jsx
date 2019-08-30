import React from 'react';
import PropTypes from 'prop-types';

import classes from './Form.module.scss';

const Form = ({
  buttons, inputs, preFormMessage, postFormMessage, onSubmit,
}) => (
  <div className={classes.Form}>
    {preFormMessage}
    <form onSubmit={onSubmit}>
      {inputs}
      {buttons}
    </form>
    {postFormMessage}
  </div>
);

Form.propTypes = {
  buttons: PropTypes.node.isRequired,
  inputs: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  preFormMessage: PropTypes.node,
  postFormMessage: PropTypes.node,
};

Form.defaultProps = {
  preFormMessage: null,
  postFormMessage: null,
};

export default Form;
