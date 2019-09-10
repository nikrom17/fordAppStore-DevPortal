import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

import RenderForm from 'app/shared/form/renderForm/renderForm';
import firebase from 'firebase/fireClass';
import accountInfoForm from './formConfig';


const AccountSettings = () => {
  console.log('Account Settings Rendered');
  const { uid } = firebase.auth.currentUser;
  const [accountInfo, loading, error] = useCollectionDataOnce(
    firebase.db.collection('users').where('userId', '==', uid),
  );
  console.log(accountInfo);
  const {
    allIds, config, type, validation,
  } = accountInfoForm;
  return (
    loading ? null
      : (
        <div>
          <RenderForm
            config={config}
            inputIds={allIds}
            type={type}
            validation={validation}
            preFormMessage={<p>Account Info</p>}
            stateValues={accountInfo[0]}
            readonly
          />
        </div>
      )
  );
};

// AccountSettings.propTypes = {
//   accountInfo: PropTypes.objectOf(
//     PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//   ).isRequired,
// };

const mapStateToProps = (state) => ({
  accountInfo: state.settings,
});

export default connect(mapStateToProps)(AccountSettings);
