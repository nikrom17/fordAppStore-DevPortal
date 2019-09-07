import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppTable from './appTable/appTable';
import Spinner from 'app/shared/spinner/spinner';
import Button from 'app/shared/button/button';
import styles from './appList.module.scss';
import Modal from 'app/shared/modal/modal'; 
import NoApps from './noAppsMessage/noAppsMessage';
import * as actions from 'redux/actions/index';

class AppList extends Component {
  componentDidMount() {
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
    const modalText = (
      <Modal
        show={forbiddenModal}
        modalClosed={() => onDeleteApp(token, userId, null, null)}
      >
        <p>Deleting Apps is not allowed when logged in as a test user!</p>
      </Modal>
    );
    const forbiddenDelete = forbiddenModal ? modalText : null;
    const appList = apps.length ? (
      <AppTable
        apps={apps}
        token={token}
        userId={userId}
        deleteApp={onDeleteApp}
        history={history}
      />
    ) : <NoApps />;
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
  }
}

AppList.propTypes = {
  onfetchApps: PropTypes.func.isRequired,
  onResetNewApp: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  apps: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  forbiddenModal: PropTypes.node.isRequired,
  onDeleteApp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
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
