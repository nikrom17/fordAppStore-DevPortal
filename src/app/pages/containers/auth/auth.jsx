import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RenderForm from 'app/shared/form/renderForm/renderForm';
import Button from 'app/shared/button/button';
import HyperlinkButton from 'app/shared/hyperlinkButton/hyperlinkButton';
import Spinner from 'app/shared/spinner/spinner';
import * as actions from 'redux/actions/index';
import { isFormValid } from 'utils/utility';
import { login, signup } from './formConfig';
import LoginFormHeader from './loginFormHeader/loginFormHeader';
import classes from './auth.module.scss';

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
    if (isFormValid(event.target, validation)) {
      const {
        devName, email, phone, password, website,
      } = event.target;
      const { isSignup } = this.state;
      const { onLogin } = this.props;
      onLogin(email, password, { devName, phone, website }, isSignup);
    }
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    console.log('Auth page rendered');
    const { error, loading } = this.props;
    const { isSignup } = this.state;
    const config = isSignup ? signup.config : login.config;
    const type = isSignup ? signup.type : login.type;
    const validation = isSignup ? signup.validation : login.validation;
    const inputIds = isSignup ? signup.allIds : login.allIds;
    const buttonArray = [
      (
        <Button
          key="submit"
          title={isSignup ? 'Create New Account' : 'Login'}
          type="submit"
        />
      ),
      (
        <HyperlinkButton
          clicked={this.switchAuthModeHandler}
          key="switchForms"
          title={isSignup ? 'Already have an account?' : 'Create an account'}
        />
      ),
    ];
    return (
      <div className={classes.centered}>
        {loading ? <Spinner /> : null}
        <RenderForm
          buttons={buttonArray}
          config={config}
          inputIds={inputIds}
          type={type}
          validation={validation}
          onSubmit={this.submitHandler}
          setFormValid={this.setFormValid}
          preFormMessage={<LoginFormHeader isSignup={isSignup} />}
          postFormMessage={error ? <p>{error.message}</p> : null}
        />
        <div className={classes.sampleData}>
          <p>To view a project with sample data, use the following credentials to login</p>
          <p>E-Mail: test@test.com </p>
          <p>Password: testing123</p>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  error: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

Auth.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  onLogin: actions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
