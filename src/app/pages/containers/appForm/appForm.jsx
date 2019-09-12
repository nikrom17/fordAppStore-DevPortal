import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderForm from 'app/shared/form/renderForm/renderForm';
import Button from 'app/shared/button/button';
import { getDate, parseQueryString } from 'utils/utility';
import * as actions from 'redux/actions/index';
import createAppForm from './formConfig';

class CreateApp extends Component {
  constructor() {
    super();
    this.state = {
      formIsValid: false,
      appIndex: null,
    };
  }

  async componentDidMount() {
    const { location, apps, onLoadAppDetails } = this.props;
    if (location.pathname !== '/createApp') {
      const { appId } = parseQueryString(location.search);
      await onLoadAppDetails(apps[appId]);
      this.downloadUrlsHandler(appId);
      this.setState({ appIndex: appId });
    }
  }


  handleSubmit = (event) => {
    const {
      devName, onCreateApp, history,
    } = this.props;
    event.preventDefault();
    const {
      title, category, description, iconFile, bannerFile, sourceFile,
    } = event.target;
    const appInfo = {
      appName: title,
      category,
      description,
      status: 'draft',
      lastUpdate: getDate(),
      avgRating: '-',
      activeInstalls: '0',
      devName,
      iconFileName: iconFile.fileObject.name,
      bannerFileName: bannerFile.fileObject.name,
      sourceFileName: sourceFile.fileObject.name,
    };
    const imagesToUpload = {
      banner: bannerFile.fileObject,
      icon: iconFile.fileObject,
    };
    const files = {
      source: sourceFile.fileObject,
      images: imagesToUpload,
    };
    onCreateApp(appInfo, files, history);
  }

  downloadUrlsHandler(appId) {
    const { apps, onUpdateDownloadUrls } = this.props;
    console.log(appId);
    const urls = {
      appIconFile: `/${apps[appId].id}/images/icon/${apps[appId].iconFileName}`,
      appBannerFile: `${apps[appId].id}/images/banner/${apps[appId].bannerFileName}`,
    };
    onUpdateDownloadUrls(urls);
  }

  render() {
    const { isFormValid } = this.state;
    const {
      config, allIds, type, validation,
    } = createAppForm;
    const button = [(
      <Button
        clicked={this.handleSubmit}
        disabled={!isFormValid}
        title="Create App"
        type="submit"
      />
    )];
    return (
      <RenderForm
        buttons={button}
        config={config}
        inputIds={allIds}
        type={type}
        validation={validation}
        onSubmit={this.handleSubmit}
        preFormMessage={<p>Upload New App</p>}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  devName: state.settings.developerName,
  appSourceFile: state.createApp.appSourceFile,
  appBannerFile: state.createApp.appBannerFile,
  appIconFile: state.createApp.appIconFile,
  title: state.createApp.title,
  description: state.createApp.description,
  category: state.createApp.category,
  fileObjects: state.createApp.fileObjects,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateApp: (appData, files, token, history) => dispatch(
    actions.createApp(appData, files, token, history),
  ),
  onLoadAppDetails: (appDetails) => dispatch(actions.loadAppDetails(appDetails)),
  onUpdateDownloadUrls: (urls) => dispatch(actions.updateDownloadUrls(urls)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp);
