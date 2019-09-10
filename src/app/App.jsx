import React from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/fireClass';

import Header from 'app/pages/header/header';
import NavBar from 'app/pages/navigation/navBar/navBar';
import Logout from 'app/pages/containers/logout/logout';
import AppList from 'app/pages/containers/appList/appList';
import AccountSettings from 'app/pages/containers/accountSettings/accountSettings';
import Auth from 'app/pages/containers/auth/auth';
import AppForm from 'app/pages/containers/appForm/appForm';
import styles from './app.module.scss';


const App = () => {
  const [user, initialising, error] = useAuthState(firebase.auth);
  console.log(user, initialising, error);
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );
  if (user) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/appDetails" component={AppForm} />
        <Route path="/createApp" component={AppForm} />
        <Route path="/accountDetails" component={AccountSettings} />
        <Route path="/" exact component={AppList} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <NavBar />
        <div className={styles.contentWrapper}>
          {routes}
        </div>
      </main>
    </>
  );
};


App.propTypes = {
  onTryAutoSignup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withRouter(App);
