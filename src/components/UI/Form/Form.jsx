import React from 'react';
import PropTypes from 'prop-types';

import classes from './Form.module.scss';

const form = ({
  buttons, inputs, preFormMessage, postFormMessage,
}) => (
  <div className={classes.Form}>
    {preFormMessage}
    <form>
      {inputs}
      {buttons}
    </form>
    {postFormMessage}
  </div>
);

form.propTypes = {
  buttons: PropTypes.node.isRequired,
  inputs: PropTypes.node.isRequired,
  preFormMessage: PropTypes.node,
  postFormMessage: PropTypes.node,
};

form.defaultProps = {
  preFormMessage: null,
  postFormMessage: null,
};

export default form;
