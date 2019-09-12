import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import * as actions from 'redux/actions/index';
import Button from 'app/shared/button/button';
import Modal from 'app/shared/modal/modal';
import Spinner from 'app/shared/spinner/spinner';
import AppTable from './appTable/appTable';
import NoApps from './noAppsMessage/noAppsMessage';
import styles from './appList.module.scss';

const AppList = (props) => {
  const {
    apps, forbiddenModal, onDeleteApp, loading, history,
  } = props;
  const modalText = (
    <Modal
      show={forbiddenModal}
      modalClosed={() => onDeleteApp()} // todo what func should be called?
    >
      <p>Deleting Apps is not allowed when logged in as a test user!</p>
    </Modal>
  );
  const forbiddenDelete = forbiddenModal ? modalText : null;
  const appList = apps.length ? (
    <AppTable
      apps={apps}
      userId="cheese"
      deleteApp={onDeleteApp}
      history={history}
    />
  ) : <NoApps onClick={() => history.push('/createApp')} />;
  return (
    <div className={styles.wrapper}>
      {forbiddenDelete}
      <Button
        clicked={() => history.push('/createApp')}
        title="Create Application"
        type="button"
        noMargin
      />
      {loading ? <Spinner /> : appList}
    </div>
  );
};

AppList.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  forbiddenModal: PropTypes.node.isRequired,
  onDeleteApp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

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
