import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppTable from '../../components/AppTable/AppTable';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './AppList.module.scss';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';

class AppList extends Component {
  componentWillMount() {
    const {
      onfetchApps, onResetNewApp, token, userId,
    } = this.props;
    onfetchApps(token, userId);
    onResetNewApp();
  }

  render() {
    const {
      apps, forbiddenModal, onDeleteApp, token, userId, loading, history,
    } = this.props;
    let appList = <Spinner />;
    const modalText = (
      <Modal
        show={forbiddenModal}
        modalClosed={() => onDeleteApp(token, userId, null, null)}
      >
        <p>Deleting Apps is not allowed when logged in as a test user!</p>
      </Modal>
    );
    const forbiddenDelete = forbiddenModal ? modalText : null;
    if (!loading) {
      appList = (
        <div className={classes.NoApps}>
          <p>
            You do not have any applications yet
            <br />
            <br />
            Add your first application
          </p>
        </div>
      );
      if (apps.length > 0) {
        appList = (
          <AppTable
            apps={apps}
            token={token}
            userId={userId}
            deleteApp={onDeleteApp}
            history={history}
          />
        );
      }
    }
    return (
      <div className={classes.wrapper}>
        {forbiddenDelete}
        <div>
          <Button
            clicked={() => history.push('/createApp')}
          >
            Create Application
          </Button>
        </div>
        {appList}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  loading: state.apps.loading,
  newApp: state.createApp.newApp,
  apps: state.apps.apps,
  token: state.auth.token,
  userId: state.auth.userId,
  forbiddenModal: state.apps.forbiddenModal,
});

const mapDispatchToProps = (dispatch) => ({
  onfetchApps: (token, userId) => dispatch(actions.fetchApps(token, userId)),
  onDeleteApp: (token, userId, appId, apps) => dispatch(
    actions.deleteApp(token, userId, appId, apps),
  ),
  onResetNewApp: () => dispatch(actions.resetNewApp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
