import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import * as actions from 'redux/actions/index';
import firebase from 'firebase/fireClass';

class Logout extends Component {
  componentDidMount() {
    const { onResetAppState } = this.props;
    onResetAppState();
    firebase.logout();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

Logout.propTypes = {
  onResetAppState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onResetAppState: () => dispatch(actions.resetAppState()),
});
export default connect(null, mapDispatchToProps)(Logout);
