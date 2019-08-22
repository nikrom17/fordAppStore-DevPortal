import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import accountSettingsForm from './formConfig';


class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsForm: accountSettingsForm,
      formIsValid: false,
    };
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { onInputChangedHandler } = this.props;
    const { settingsForm } = this.state;
    onInputChangedHandler(event, inputIdentifier);
    const updatedFormElement = updateObject(settingsForm[inputIdentifier], {
      valid: checkValidity(event.target.value, settingsForm[inputIdentifier].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(settingsForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    const array = Object.keys(updatedOrderForm);
    formIsValid = array.reduce(() => (updatedOrderForm[inputIdentifier].valid && formIsValid));
    this.setState({ settingsForm: updatedOrderForm, formIsValid });
  }

  render() {
    const { settingsForm, formIsValid } = this.state;
    const key = Object.keys(settingsForm);
    const formElementsArray = key.map(() => ({ id: key, config: settingsForm[key] }));
    const form = (
      <Form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            header={formElement.config.elementConfig.header}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            // eslint-disable-next-line react/destructuring-assignment
            value={this.props[formElement.id]}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={formIsValid}>Update Account Settings</Button>
      </Form>
    );
    return (
      <div>
        {form}
      </div>
    );
  }
}

AccountSettings.propTypes = {
  onInputChangedHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  developerName: state.settings.developerName,
  email: state.settings.email,
  website: state.settings.website,
  phone: state.settings.phone,

});

const mapDispatchToProps = (dispatch) => ({
  onInputChangedHandler: (event, inputIdentifier) => dispatch(
    actions.inputChangedHandlerSettings(event, inputIdentifier),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
