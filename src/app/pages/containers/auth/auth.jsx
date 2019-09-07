import React, { Component } from 'app/pages/containers/auth/react';
import { connect } from 'app/pages/containers/auth/react-redux';
import { Redirect } from 'app/pages/containers/auth/react-router-dom';
import PropTypes from 'app/pages/containers/auth/prop-types';

import RenderForm from 'app/pages/containers/auth/renderForm/renderForm';
import Button from 'app/pages/containers/auth/Button/Button';
import Spinner from 'app/pages/containers/auth/Spinner/Spinner';
import SampleDataMessage from 'app/pages/containers/auth/sampleDataMessage/sampleDataMessage';
import * as actions from 'app/pages/containers/auth/app/pages/containers/appList/actions/index';
import { isFormValid } from 'app/pages/containers/auth/utils/utility';
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
