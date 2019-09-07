import React from 'app/shared/form/app/shared/Form/react';
import PropTypes from 'app/shared/form/app/shared/Form/prop-types';

import styles from './Form.module.scss';

const Form = ({
  buttons, inputs, preFormMessage, postFormMessage, onSubmit,
}) => (
  <div className={styles.Form}>
    {preFormMessage}
    <form onSubmit={(event) => onSubmit(event)}>
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
