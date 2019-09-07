import React, { Component } from 'app/pages/containers/logout/app/pages/containers/Logout/react';
import { Redirect } from 'app/pages/containers/logout/app/pages/containers/Logout/react-router-dom';
import { connect } from 'app/pages/containers/logout/app/pages/containers/Logout/react-redux';
import PropTypes from 'app/pages/containers/logout/app/pages/containers/Logout/prop-types';

import * as actions from '../../../store/actions/index';

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
