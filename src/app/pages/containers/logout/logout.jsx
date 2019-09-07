import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from 'redux/actions/index';

class Logout extends Component {
  componentDidMount() {
    const { onLogout, onResetAppState } = this.props;
    onResetAppState();
    onLogout();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onResetAppState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
  onResetAppState: () => dispatch(actions.resetAppState()),
});
export default connect(null, mapDispatchToProps)(Logout);
