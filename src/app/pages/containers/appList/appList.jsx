import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

import * as actions from 'redux/actions/index';
import Button from 'app/shared/button/button';
// import Modal from 'app/shared/modal/modal';
import Spinner from 'app/shared/spinner/spinner';
import firebase from 'firebase/fireClass';
import AppTable from './appTable/appTable';
import NoApps from './noAppsMessage/noAppsMessage';
import styles from './appList.module.scss';

const AppList = (props) => {
  const [apps, loading] = useCollectionDataOnce(firebase.appList());
  const { history } = props;
  // const modalText = (
  //   <Modal
  //     show={forbiddenModal}
  //     modalClosed={() => onDeleteApp()} // todo what func should be called?
  //   >
  //     <p>Deleting Apps is not allowed when logged in as a test user!</p>
  //   </Modal>
  // );
  // const forbiddenDelete = forbiddenModal ? modalText : null;
  const appList = apps && apps.length ? (
    <AppTable
      apps={apps}
      userId="cheese"
      history={history}
    />
  ) : <NoApps onClick={() => history.push('/createApp')} />;
  return (
    <div className={styles.wrapper}>
      {/* {forbiddenDelete} */}
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
  forbiddenModal: PropTypes.node.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => ({
  newApp: state.createApp.newApp,
  forbiddenModal: state.apps.forbiddenModal,
});

const mapDispatchToProps = (dispatch) => ({
  onResetNewApp: () => dispatch(actions.resetNewApp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
