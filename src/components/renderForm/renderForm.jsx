import React from 'react';
import PropTypes from 'prop-types';

import Form from '../UI/Form/Form';
import Input from '../UI/inputRender/inputRender';

const RenderForm = ({
  buttons, onChange, onSubmit, preFormMessage, postFormMessage, config,
  inputIds, type, validation, validateValue,
}) => {
  const inputs = inputIds.map((inputId) => (
    <Input
      config={config.byId[inputId]}
      key={inputId}
      inputId={inputId}
      onChange={onChange}
      type={type.byId[inputId]}
      validation={validation.byId[inputId]}
      validateValue={validateValue}
    />
  ));
  return (
    <Form
      onSubmit={onSubmit}
      buttons={buttons}
      inputs={inputs}
      preFormMessage={preFormMessage}
      postFormMessage={postFormMessage}
    />
  );
};

RenderForm.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node).isRequired,
  config: PropTypes.objectOf(PropTypes.object).isRequired,
  controls: PropTypes.objectOf(PropTypes.object).isRequired,
  type: PropTypes.objectOf(PropTypes.object).isRequired,
  validation: PropTypes.objectOf(PropTypes.object).isRequired,
  validateValue: PropTypes.func.isRequired,
  inputIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  preFormMessage: PropTypes.node,
  postFormMessage: PropTypes.node,
};

RenderForm.defaultProps = {
  preFormMessage: null,
  postFormMessage: null,
};

export default RenderForm;
