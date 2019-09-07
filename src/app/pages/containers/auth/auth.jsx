import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import RenderForm from 'app/shared/form/renderForm/renderForm';
import Button from 'app/shared/button/button';
import Spinner from 'app/shared/spinner/spinner';
import SampleDataMessage from './sampleDataMessage/sampleDataMessage';
import * as actions from 'redux/actions/index';
import { isFormValid } from 'utils/utility';
import { login, signup } from './formConfig';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      isSignup: false,
    };
  }

  submitHandler = (event, validation) => {
    event.preventDefault();
    console.log('submitHandler');
    if (isFormValid(event.target, validation)) {
      const {
        devName, email, phone, website,
        password,
      } = event.target;
      const { isSignup } = this.state;
      const { onAuth } = this.props;
      // if (isSignup) {
      onAuth({
        email, phone, website, devName,
      }, password, isSignup);
      // } else {
      // onAuth({ email }, password, isSignup);
      // }
    }
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    console.log('Auth page rendered');
    const {
      authRedirectPath, error, loading, isAuthenticated,
    } = this.props;
    const { isSignup } = this.state;
    const config = isSignup ? signup.config : login.config;
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
          key="submit"
          title={isSignup ? 'Create New Account' : 'Login'}
          type="submit"
        />
      ),
    ];
    return (
      <div>
        {isAuthenticated ? <Redirect to={authRedirectPath} /> : null}
        {loading ? <Spinner /> : null}
        <RenderForm
          buttons={buttonArray}
          config={config}
          inputIds={inputIds}
          type={type}
          validation={validation}
          onSubmit={this.submitHandler}
          setFormValid={this.setFormValid}
          preFormMessage={isSignup ? null : <SampleDataMessage />}
          postFormMessage={error ? <p>{error.message}</p> : null}
        />
      </div>
    );
  }
}

Auth.propTypes = {
  authRedirectPath: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
};

Auth.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  authRedirectPath: state.auth.authRedirectPath,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (userInfo, password, isSignup) => dispatch(actions.auth(userInfo, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
