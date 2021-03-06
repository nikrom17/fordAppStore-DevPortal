import React from 'react';
import PropTypes from 'prop-types';

import Input from 'app/shared/form/inputRender/inputRender';
import styles from './renderForm.module.scss';

const RenderForm = ({
  buttons, onSubmit, preFormMessage, postFormMessage, config,
  inputIds, type, validation, stateValues,
}) => {
  const inputs = inputIds.map((inputId) => (
    <Input
      config={config.byId[inputId]}
      inputId={inputId}
      key={inputId}
      type={type.byId[inputId]}
      validation={validation.byId[inputId]}
      stateValue={stateValues ? stateValues[inputId] : null}
    />
  ));
  return (
    <div className={styles.form}>
      {preFormMessage}
      <form onSubmit={(event) => onSubmit(event, validation)}>
        {inputs}
        {buttons}
      </form>
      {postFormMessage}
    </div>
  );
};

RenderForm.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  config: PropTypes.objectOf(PropTypes.object).isRequired,
  stateValues: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  ),
  inputIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func,
  postFormMessage: PropTypes.node,
  preFormMessage: PropTypes.node,
  type: PropTypes.objectOf(PropTypes.object).isRequired,
  validation: PropTypes.objectOf(PropTypes.object).isRequired,
};

RenderForm.defaultProps = {
  buttons: null,
  onSubmit: null,
  stateValues: null,
  postFormMessage: null,
  preFormMessage: null,
};

export default RenderForm;
