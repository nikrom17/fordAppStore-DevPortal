import React from 'react';
import PropTypes from 'prop-types';

import Form from '../UI/Form/Form';
import Input from '../UI/inputRender/inputRender';

const renderForm = ({
  inputConfig, buttons, onChange, preFormMessage, postFormMessage,
}) => {
  const keys = Object.keys(inputConfig);
  const inputs = keys.map((key) => {
    const input = inputConfig[key];
    return (
      <Input
        key={key}
        config={input.config}
        controls={input.controls}
        element={input.type}
        inputId={key}
        onChange={onChange}
      />
    );
  });
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
  inputConfig: PropTypes.objectOf( // one form in the formconfig
    PropTypes.objectOf( // one form
      PropTypes.oneOf([
        PropTypes.objectOf( // config, controls, validation
          PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
        ),
        PropTypes.string, // type
      ]),
    ),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  preFormMessage: PropTypes.node,
  postFormMessage: PropTypes.node,
};

renderForm.defaultProps = {
  preFormMessage: null,
  postFormMessage: null,
};

export default renderForm;
