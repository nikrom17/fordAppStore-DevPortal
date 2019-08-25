import React from 'react';
import PropTypes from 'prop-types';

import Form from '../UI/Form/Form';
import Input from '../UI/inputRender/inputRender';

const renderForm = ({ inputConfig }) => {
  const keys = Object.keys(inputConfig);
  const inputs = keys.map((key) => {
    const input = inputConfig[key];
    return (
      <Input
        onChange={(event) => this.inputChangedHandler(event, input.id)}
        config={input.config}
        invalid={!input.config.valid}
        key
        touched={input.config.touched}
        element={input.type}
        value={inputConfig[input.id]}
      />
    );
  });
  return (
    <Form
      buttons={(<div>hello</div>)}
      inputs={inputs}
    />
  );
};

renderForm.propTypes = {
  inputConfig: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ).isRequired,
};

export default renderForm;
