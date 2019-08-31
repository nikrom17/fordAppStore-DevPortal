import React from 'react';
import PropTypes from 'prop-types';

import Form from '../UI/Form/Form';
import Input from '../UI/inputRender/inputRender';

const RenderForm = ({
  buttons, onSubmit, preFormMessage, postFormMessage, config,
  inputIds, type, validation,
}) => {
  const inputs = inputIds.map((inputId) => (
    <Input
      config={config.byId[inputId]}
      inputId={inputId}
      key={inputId}
      type={type.byId[inputId]}
      validation={validation.byId[inputId]}
    />
  ));
  return (
    <Form
      buttons={buttons}
      inputs={inputs}
      onSubmit={onSubmit}
      postFormMessage={postFormMessage}
      preFormMessage={preFormMessage}
    />
  );
};

RenderForm.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node).isRequired,
  config: PropTypes.objectOf(PropTypes.object).isRequired,
  inputIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  postFormMessage: PropTypes.node,
  preFormMessage: PropTypes.node,
  type: PropTypes.objectOf(PropTypes.object).isRequired,
  validation: PropTypes.objectOf(PropTypes.object).isRequired,
};

RenderForm.defaultProps = {
  postFormMessage: null,
  preFormMessage: null,
};

export default RenderForm;
