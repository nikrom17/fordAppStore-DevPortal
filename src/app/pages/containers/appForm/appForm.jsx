import React, { useState } from 'react';
import { connect } from 'react-redux';

import RenderForm from 'app/shared/form/renderForm/renderForm';
import Button from 'app/shared/button/button';
import { getDate } from 'utils/utility';
import * as actions from 'redux/actions/index';
import firebase from 'firebase/fireClass';
import createAppForm from './formConfig';

const NewApp = ({ location, uploadNewApp, apps }) => {
  const [isNewApp, setIsNewApp] = useState(false);
  let app;
  if (!isNewApp && location.pathname === '/createApp') {
    setIsNewApp(true);
  }
  if (location.pathname !== '/createApp') {
    app = location.state.app;
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      appName, category, description, icon, banner, source,
    } = event.target;
    const appInfo = {
      appName: appName.value,
      category: category.value,
      description: description.value,
      status: 'draft',
      lastUpdate: getDate(),
      avgRating: '-',
      activeInstalls: '0',
      uid: firebase.auth.currentUser.uid,
    };
    const files = { icon: icon.files[0], banner: banner.files[0], source: source.files[0] };
    if (isNewApp) {
      uploadNewApp(appInfo, files);
    } else {
      uploadNewApp(appInfo, files); // do I need a different function?
    }
  };

  const {
    config, allIds, type, validation,
  } = createAppForm;
  const newAppButton = [(
    <Button
      key="createApp"
      title="Create App"
      type="submit"
    />
  )];
  const appButtons = [(
    <Button
      key="editApp"
      title="Edit App"
      type="button"
    />),
  (
    <Button
      key="Publish"
      title="Publish App"
      type="button"
    />),
  ];
  return (
    <RenderForm
      buttons={isNewApp ? newAppButton : appButtons}
      canEdit={isNewApp}
      config={config}
      inputIds={allIds}
      type={type}
      validation={validation}
      onSubmit={handleSubmit}
      stateValues={app}
      preFormMessage={isNewApp ? <p>Upload New App</p> : <p>App Details</p>}
    />
  );
};

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  appSourceFile: state.createApp.appSourceFile,
  appBannerFile: state.createApp.appBannerFile,
  appIconFile: state.createApp.appIconFile,
  title: state.createApp.title,
  description: state.createApp.description,
  category: state.createApp.category,
  fileObjects: state.createApp.fileObjects,
});

const mapDispatchToProps = (dispatch) => ({
  uploadNewApp: (appData, files) => dispatch(
    actions.uploadNewApp(appData, files),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewApp);
