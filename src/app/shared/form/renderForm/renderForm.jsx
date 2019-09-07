import React from 'app/shared/Form/renderForm/react';
import PropTypes from 'app/shared/Form/renderForm/prop-types';

import Input from '../UI/inputRender/inputRender';
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
      stateValue={stateValues ? stateValues.byId[inputId] : null}
    />
  ));
  return (
    <div className={styles.Form}>
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
    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
