import React, { Component } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './App.module.scss';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import AppList from './containers/AppList/AppList';
import AccountSettings from './containers/AccountSettings/AccountSettings';
import Auth from './containers/Auth/Auth';
import AppDetails from './containers/AppDetails/AppDetails';
import CreateApp from './containers/CreateApp/CreateApp';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  render() {
    const { isAuthenticated } = this.props;
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/appDetails" component={AppDetails} />
          <Route path="/createApp" component={CreateApp} />
          <Route path="/accountDetails" component={AccountSettings} />
          <Route path="/" exact component={AppList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <>
        <Layout />
        <main className={classes.content}>
          {routes}
        </main>
      </>
    );
  }
}

App.propTypes = {
  onTryAutoSignup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
