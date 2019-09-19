import React from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

import RenderForm from 'app/shared/form/renderForm/renderForm';
import firebase from 'firebase/fireClass';
import accountInfoForm from './formConfig';


const AccountSettings = () => {
  const [accountInfo, loading] = useCollectionDataOnce(firebase.accountSettings());
  let accountSettings;
  if (accountInfo) {
    accountSettings = {
      ...accountInfo[0],
    };
  }

  const {
    allIds, config, type, validation,
  } = accountInfoForm;
  return (
    loading ? null
      : (
        <RenderForm
          config={config}
          inputIds={allIds}
          type={type}
          validation={validation}
          preFormMessage={<p>Account Info</p>}
          stateValues={accountSettings}
          readonly
        />
      )
  );
};

export default AccountSettings;
