import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

import RenderForm from 'app/shared/form/renderForm/renderForm';
import Button from 'app/shared/button/button';
import { getDate, parseQueryString } from 'utils/utility';
import * as actions from 'redux/actions/index';
import firebase from 'firebase/fireClass';
import createAppForm from './formConfig';

const NewApp = ({ location, uploadNewApp }) => {
  const [isNewApp, setIsNewApp] = useState(false);
  const [apps, loading] = useCollectionDataOnce(firebase.appList());
  let app;
  if (!loading) {
    if (location.pathname === '/createApp') {
      setIsNewApp(true);
    } else {
      const { appId } = parseQueryString(location.search);
      app = {
        byId: {
          ...apps[appId],
        },
      };
      console.log(app);
    }
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
      key="createApp"
      title="Create App"
      type="submit"
    />
  )];
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
  onLoadAppDetails: (appDetails) => dispatch(actions.loadAppDetails(appDetails)),
  onUpdateDownloadUrls: (urls) => dispatch(actions.updateDownloadUrls(urls)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewApp);
