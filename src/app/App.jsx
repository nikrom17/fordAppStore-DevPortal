import React from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/fireClass';

import Header from 'app/pages/header/header';
import NavBar from 'app/pages/navigation/navBar/navBar';
import Logout from 'app/pages/containers/logout/logout';
import AppList from 'app/pages/containers/appList/appList';
import AccountSettings from 'app/pages/containers/accountSettings/accountSettings';
import Auth from 'app/pages/containers/auth/auth';
import AppForm from 'app/pages/containers/appForm/appForm';
import Spinner from 'app/shared/spinner/spinner';
import styles from './app.module.scss';


const App = () => {
  const [user, initializing, error] = useAuthState(firebase.auth);
  console.log(user, initializing, error);
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
        {user ? <NavBar /> : null}
        <div className={styles.contentWrapper}>
          {initializing ? <Spinner /> : routes}
        </div>
      </main>
    </>
  );
};

export default withRouter(App);
