import React from 'react';
import PropTypes from 'prop-types';

import Form from '../UI/Form/Form';
import Input from '../UI/inputRender/inputRender';

const renderForm = ({
  buttons, onChange, preFormMessage, postFormMessage, config, controls, inputIds, type, validation,
}) => {
  const inputs = inputIds.map((inputId) => (
    <Input
      config={config.byId[inputId]}
      controls={controls.byId[inputId]}
      key={inputId}
      inputId={inputId}
      onChange={onChange}
      type={type.byId[inputId]}
      validation={validation.byId[inputId]}
    />
  ));
  return (
    <Form
      buttons={buttons}
      inputs={inputs}
      preFormMessage={preFormMessage}
      postFormMessage={postFormMessage}
    />
  );
};

renderForm.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node).isRequired,
  config: PropTypes.objectOf(PropTypes.object).isRequired,
  controls: PropTypes.objectOf(PropTypes.object).isRequired,
  type: PropTypes.objectOf(PropTypes.object).isRequired,
  validation: PropTypes.objectOf(PropTypes.object).isRequired,
  inputIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  preFormMessage: PropTypes.node,
  postFormMessage: PropTypes.node,
};

renderForm.defaultProps = {
  preFormMessage: null,
  postFormMessage: null,
};

export default renderForm;
