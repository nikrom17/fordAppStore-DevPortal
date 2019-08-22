import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.scss';
import Aux from '../../hoc/Aux/Aux';
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
      devName, email, website, phone, onAuth, password, isSignup,
    } = this.props;
    event.preventDefault();
    const userInfo = {
      devName,
      email,
      website,
      phone,
    };
    onAuth(userInfo, password, isSignup);
  }

    switchAuthModeHandler = () => {
      this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
    }

    render() {
      const {
        error, isSignup, loading, isAuthenticated, authRedirectPath,
      } = this.props;
      const { form } = this.state;

      const sampleDataHTML = (
        <Aux>
          <p>To view a project with sample data, use the following credentials to login</p>
          <p>E-Mail: test@test.com</p>
          <p>Password: testing123</p>
        </Aux>
      );
      const sampleDataNote = isSignup ? null : sampleDataHTML;
      const formType = isSignup ? signupForm : loginForm;
      const keyArray = Object.keys(formType);
      const formElementsArray = keyArray.map((id) => ({ id, config: formType[id] }));

      let formNode = formElementsArray.map((formElement) => (
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

      if (loading) {
        formNode = <Spinner />;
      }
      let errorMessage = null;
      if (error) {
        errorMessage = <p>{error.message}</p>;
      }

      let authRedirect = null;
      if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />;
      }
      return (
        <div className={classes.Auth}>
          {authRedirect}
          {errorMessage}
          <form onSubmit={this.submitHandler}>
            {sampleDataNote}
            {formNode}
            <Button btnType="Success">{isSignup ? 'Create New Account' : 'Login'}</Button>
          </form>
          <Button
            clicked={this.switchAuthModeHandler}
            btnType="Danger"
          >
            Switch to
            {' '}
            {isSignup ? 'Login' : 'Sign-Up' }
          </Button>
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
  onAuth: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isSignup: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
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
