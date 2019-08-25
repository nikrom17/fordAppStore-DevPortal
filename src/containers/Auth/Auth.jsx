import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../components/UI/inputRender/inputRender';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import SampleDataMessage from '../../components/sampleDataMessage/sampleDataMessage';
import classes from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import { loginForm, signupForm } from './formConfig';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        loginForm,
        signupForm,
      },
      isSignup: false,
    };
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { onInputChangedHandler } = this.props;
    const { isSignup, controls, form } = this.state;
    onInputChangedHandler(event, inputIdentifier);
    const formName = isSignup ? 'signupForm' : 'loginForm';
    const updatedControls = updateObject(controls, {
      [inputIdentifier]: updateObject(form[formName][inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, form[formName][inputIdentifier].validation),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    const {
      devName, email, website, phone, onAuth, password,
    } = this.props;
    const { isSignup } = this.state;
    event.preventDefault();
    onAuth({
      devName, email, website, phone,
    }, password, isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
  }

  render() {
    const {
      error, loading, isAuthenticated, authRedirectPath,
    } = this.props;
    const { isSignup } = this.state;
    const formType = isSignup ? signupForm : loginForm;
    const keyArray = Object.keys(formType);
    const formElementsArray = keyArray.map((id) => ({ id, config: formType[id] }));

    const formNode = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        // eslint-disable-next-line react/destructuring-assignment
        value={this.props[formElement]}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div className={classes.auth}>
        {isAuthenticated ? <Redirect to={authRedirectPath} /> : null}
        {error ? <p>{error.message}</p> : null}
        {loading ? <Spinner /> : (
          <form>
            {isSignup ? null : <SampleDataMessage />}
            {formNode}
            <Button
              clicked={this.submitHandler}
              title={isSignup ? 'Create New Account' : 'Login'}
              type="submit"
            />
          </form>
        )}
        <Button
          clicked={this.switchAuthModeHandler}
          title={`Switch to ${isSignup ? 'Login' : 'Sign-Up'}`}
          type="button"
        />
      </div>
    );
  }
}

Auth.propTypes = {
  onInputChangedHandler: PropTypes.func.isRequired,
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
  onInputChangedHandler: (event, inputIdentifier) => dispatch(
    actions.inputChangedHandlerSettings(event, inputIdentifier),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
