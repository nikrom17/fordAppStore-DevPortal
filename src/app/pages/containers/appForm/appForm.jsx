import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderForm from 'app/shared/form/renderForm/renderForm';
import Button from 'app/shared/button/button';
import { getDate, parseQueryString } from 'utils/utility';
import * as actions from 'redux/actions/index';
import createAppForm from './formConfig';

class CreateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid: false,
      appIndex: null,
    };
  }

  // async componentDidMount() {
  //   const { location, apps, onLoadAppDetails } = this.props;
  //   if (location.pathname !== '/createApp') {
  //     const { appId } = parseQueryString(location.search);
  //     await onLoadAppDetails(apps[appId]);
  //     this.downloadUrlsHandler(appId);
  //     this.setState({ appIndex: appId });
  //   }
  // }


  handleSubmit = (event) => {
    const { uploadNewApp } = this.props;
    event.preventDefault();
    const {
      title, category, description, icon, banner, source,
    } = event.target;
    const appInfo = {
      appName: title,
      category,
      description,
      status: 'draft',
      lastUpdate: getDate(),
      avgRating: '-',
      activeInstalls: '0',
    };
    const files = { icon, banner, source };
    uploadNewApp(appInfo, files);
  }

  render() {
    const { isFormValid } = this.state;
    const {
      config, allIds, type, validation,
    } = createAppForm;
    const button = [(
      <Button
        key="createApp"
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp);
