import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../../components/renderForm/renderForm';
import Button from '../../components/UI/Button/Button';
import { getDate } from '../../shared/utility';
import createAppForm from './formConfig';
import * as actions from '../../store/actions/index';
import RenderForm from '../../components/renderForm/renderForm';

class CreateApp extends Component {
  constructor() {
    super();
    this.state = {
      formIsValid: false,
    };
  }


  handleSubmit = (event) => {
    const {
      token, userId, devName, onCreateApp, history,
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
      userId,
    };
    const imagesToUpload = {
      banner: bannerFile.fileObject,
      icon: iconFile.fileObject,
    };
    const files = {
      source: sourceFile.fileObject,
      images: imagesToUpload,
    };
    const auth = {
      token,
      userId,
    };
    onCreateApp(appInfo, files, auth, history);
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

CreateApp.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  userId: state.auth.userId,
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
  onInputChangedHandler: (event, inputIdentifier) => dispatch(
    actions.inputChangedHandler(event, inputIdentifier),
  ),
  onCreateApp: (appData, files, token, history) => dispatch(
    actions.createApp(appData, files, token, history),
  ),
  onFileInputChangedHandler: (value, fileObject, inputIdentifier) => dispatch(
    actions.fileInputChangedHandler(value, fileObject, inputIdentifier),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp);
