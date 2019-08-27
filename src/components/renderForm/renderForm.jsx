import React from 'react';
import PropTypes from 'prop-types';

import Form from '../UI/Form/Form';
import Input from '../UI/inputRender/inputRender';

const renderForm = ({
  inputConfig, buttons, preFormMessage, postFormMessage,
}) => {
  const keys = Object.keys(inputConfig);
  const inputs = keys.map((key) => {
    const input = inputConfig[key];
    console.log(input);
    return (
      <Input
        onChange={(event) => this.inputChangedHandler(event, input.id)}
        config={input.config}
        invalid={!input.config.valid}
        key={key}
        touched={input.config.touched}
        element={input.type}
        value={inputConfig[input.id]}
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
  inputConfig: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ).isRequired,
  preFormMessage: PropTypes.node,
  postFormMessage: PropTypes.node,
};

renderForm.defaultProps = {
  preFormMessage: null,
  postFormMessage: null,
};

export default renderForm;
