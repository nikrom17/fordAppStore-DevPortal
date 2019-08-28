import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import RenderForm from '../../components/renderForm/renderForm';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import SampleDataMessage from '../../components/sampleDataMessage/sampleDataMessage';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';
import { login, signup } from './formConfig';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: login.config,
      controls: login.controls,
      inputIds: login.allIds,
      type: login.type,
      validation: login.validation,
      isSignup: false,
    };
  }

  inputChangedHandler = (event, inputId) => {
    const { controls, validation } = this.state;
    const updatedControls = {
      byId: {
        ...controls.byId,
        [inputId]: {
          value: event.target.value,
          valid: checkValidity(event.target.value, validation.byId[inputId]),
          touched: true,
        },
      },
    };
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    const { devName, onAuth } = this.props;
    const { controls, isSignup } = this.state;
    const email = controls.byId.email.value;
    const password = controls.byId.password.value;
    event.preventDefault();
    onAuth({ email }, password, isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
  }

  render() {
    const {
      error, loading, isAuthenticated, authRedirectPath,
    } = this.props;
    const { isSignup } = this.state;
    const config = isSignup ? signup.config : login.config;
    const controls = isSignup ? signup.controls : login.controls;
    const type = isSignup ? signup.type : login.type;
    const validation = isSignup ? signup.validation : login.validation;
    const inputIds = isSignup ? signup.allIds : login.allIds;
    const buttonArray = [
      (
        <Button
          clicked={this.switchAuthModeHandler}
          key="switchForms"
          title={`Switch to ${isSignup ? 'Login' : 'Sign-Up'}`}
          type="button"
        />
      ),
      (
        <Button
          clicked={this.submitHandler}
          key="submit"
          title={isSignup ? 'Create New Account' : 'Login'}
          type="submit"
        />
      ),
    ];
    return (
      <div>
        {isAuthenticated ? <Redirect to={authRedirectPath} /> : null}
        {error ? <p>{error.message}</p> : null}
        {loading ? <Spinner /> : (
          <RenderForm
            buttons={buttonArray}
            config={config}
            controls={controls}
            inputIds={inputIds}
            type={type}
            validation={validation}
            onChange={this.inputChangedHandler}
            preFormMessage={isSignup ? null : <SampleDataMessage />}
          />
        )}
      </div>
    );
  }
}

Auth.propTypes = {
  devName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
};

Auth.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  authRedirectPath: state.auth.authRedirectPath,
  devName: state.settings.developerName,
  email: state.settings.email,
  website: state.settings.website,
  phone: state.settings.phone,
  password: state.settings.password,
  confirmPassword: state.settings.confirmPassword,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (userInfo, password, isSignup) => dispatch(actions.auth(userInfo, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);


// inputChangedHandler = (event, inputIdentifier) => {
//   const { onInputChangedHandler } = this.props;
//   const { isSignup, controls, form } = this.state;
//   onInputChangedHandler(event, inputIdentifier);
//   const formName = isSignup ? 'signupForm' : 'loginForm';
//   const updatedControls = updateObject(controls, {
//     [inputIdentifier]: updateObject(form[formName][inputIdentifier], {
//       value: event.target.value,
//       valid: checkValidity(event.target.value, form[formName][inputIdentifier].validation),
//       touched: true,
//     }),
//   });
//   this.setState({ controls: updatedControls });
// }
