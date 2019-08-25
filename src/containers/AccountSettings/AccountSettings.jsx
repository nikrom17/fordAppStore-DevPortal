import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RenderForm from '../../components/renderForm/renderForm';
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
    return (
      <div>
        <RenderForm
          inputConfig={settingsForm}
        />
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
