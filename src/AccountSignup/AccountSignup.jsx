import React, { Component } from 'react';
// TODO add firebase auth

import classes from './AccountSignup.css';

class AccountSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devName: '',
      email: '',
      website: '',
      phone: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,
    };
    this.accountSettings = null;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    const { email, password } = this.state;
    event.preventDefault();


    try {
      const newUser = await Auth.signUp({
        username: email,
        password,
      });
      this.setState({
        newUser,
      });
    } catch (e) {
      alert(e.message);
    }
  }

  handleConfirmationSubmit = async (event) => {
    event.preventDefault();


    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.childProps.userHasAuthenticated(true);

      const devAccountSettings = {
        devName: this.state.devName,
        devID: this.state.email,
        website: this.state.website,
        phone: this.state.phone,
      };
      Auth.currentSession();
      await API.post('userSettingsCRUD', '/userSettings', { body: devAccountSettings }).then((result) => console.log(result));
      this.props.setCookie('devID', this.state.email, 1);
      this.props.goToApps();
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  validateConfirmationForm() {
    const { confirmationCode } = this.state;
    return confirmationCode.length > 0;
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <p>Confirmation Code</p>
        <input
          type="tel"
          name="confirmationCode"
          value={this.state.confirmationCode}
          onChange={this.handleChange}
        />
        <p>Please check your email for the code.</p>
        <input
          type="submit"
          value="Confirm"
        />
      </form>
    );
  }


  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="devName"
          placeholder="Developer name"
          value={this.state.developerName}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="url"
          name="website"
          placeholder="Website"
          value={this.state.website}
          onChange={this.handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={this.state.phone}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Create Account"
        />
      </form>
    );
  }

  validateForm() {
    return (
      this.state.email.length > 0
      && this.state.password.length > 0
      && this.state.password === this.state.confirmPassword
    );
  }

  render() {
    return (
      <div className={classes.formStyle}>
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
export default AccountSignup;
