/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity, parseQueryString } from '../../shared/utility';
import { publishAppForm, editAppDetailsForm } from './formConfig';
import * as actions from '../../store/actions/index';

class AppDetails extends Component {
  constructor() {
    super();
    this.state = {
      publishAppForm,
      editAppDetailsForm,
      formIsValid: false,
      formName: 'publishAppForm',
      appIndex: null,
    };
  }

  async componentDidMount() {
    const { location, apps, onLoadAppDetails } = this.props;
    const queryParams = parseQueryString(location.search);
    await onLoadAppDetails(apps[queryParams.appId]);
    this.downloadUrlsHandler();
    this.setState({ appIndex: queryParams.appId });
  }

  componentWillUnmount() {
    const { onResetAppDetails } = this.props;
    onResetAppDetails();
  }

  handleSubmit = async (event) => {
    const {
      title, category, description, devName, appIconFile, appBannerFile, userId, onCreateApp, token, history,
    } = this.props;
    event.preventDefault();
    this.setState({ isLoading: true });

    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;

    const appInfo = {
      appName: title,
      category,
      description,
      status: 'live',
      lastUpdate: today,
      avgRating: '-',
      activeInstalls: '0',
      devName,
      iconKey: appIconFile,
      bannerKey: appBannerFile,
      userId,
    };
    onCreateApp(appInfo, token, history);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { onFileInputChangedHandlerAD, onInputChangedHandlerAD } = this.props;
    const { formName } = this.state;
    // eslint-disable-next-line no-unused-expressions
    event.target.files
      ? onFileInputChangedHandlerAD(event, inputIdentifier)
      : onInputChangedHandlerAD(event, inputIdentifier);
    const updatedFormElement = updateObject([formName][inputIdentifier], {
      valid: checkValidity(event.target.value, [formName][inputIdentifier].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject([formName], {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    // eslint-disable-next-line guard-for-in
    for (const inputIdentifier in updatedOrderForm) { // TODO use Object.Keys()
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ [formName]: updatedOrderForm, formIsValid });
  }

  switchForms = () => {
    const { formName } = this.state;
    if (formName === 'publishAppForm') {
      this.setState({ formName: 'editAppDetailsForm' });
    } else {
      this.setState({ formName: 'publishAppForm' });
    }
  }

  updateAppDetails = () => {
    const {
      appBannerFile, appIconFile, appSourceFile, apps, onUpdateFile, userId, token,
    } = this.props;
    const { appIndex } = this.state;
    let files;
    let path;
    if (appBannerFile.fileObject !== null) {
      files = {
        oldFile: apps[appIndex].bannerFileName,
        newFile: appBannerFile.fileObject,
      };
      path = 'images/banner';
      onUpdateFile(files, { userId, token }, apps[appIndex].id, path);
    }
    if (appIconFile.fileObject !== null) {
      files = {
        oldFile: apps[appIndex].iconFileName,
        newFile: appIconFile.fileObject,
      };
      path = 'images/icon';
      onUpdateFile(files, { userId, token }, apps[appIndex].id, path);
    }
    if (appSourceFile.fileObject !== null) {
      files = {
        oldFile: apps[appIndex].sourceFileName,
        newFile: appSourceFile.fileObject,
      };
      path = 'source';
      onUpdateFile(files, { userId, token }, apps[appIndex].id, path);
    }
    this.switchForms();
  }

  downloadUrlsHandler() {
    const { appDetails, userId, onUpdateDownloadUrls } = this.props;
    const urls = {
      appIconFile: `/${userId}/${appDetails.id}/images/icon/${appDetails.iconFileName}`,
      appBannerFile: `/${userId}/${appDetails.id}/images/banner/${appDetails.bannerFileName}`,
    };
    onUpdateDownloadUrls(urls);
  }

  render() {
    const { formName, formIsValid } = this.state;
    const { loading } = this.props;
    const editState = formName === 'publishAppForm';
    const buttons = (
      <>
        <Button
          clicked={this.switchForms}
          btnType="Success"
        >
          {editState ? 'Edit App Details' : 'Cancel Edits'}
        </Button>
        <Button
          clicked={editState ? this.handleSubmit : this.updateAppDetails}
          btnType="Success"
          disabled={!formIsValid}
        >
          {editState ? 'Publish App' : 'Save Changes'}
        </Button>
      </>
    );
    const formElementsArray = [];
    for (const key in this.state[this.state.formName]) {
      formElementsArray.push({
        id: key,
        config: this.state[this.state.formName][key],
      });
    }
    const form = loading ? <Spinner /> : (
      <Form>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            header={formElement.config.elementConfig.header}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={[formElement.id]}
            src={[formElement.id]}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            readOnly={formName !== 'editAppDetailsForm'}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <div>
          {buttons}
        </div>
      </Form>
    );
    return (
      { form }
    );
  }
}

AppDetails.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  apps: PropTypes.array.isRequired,
  bannerDownloadUrl: PropTypes.string.isRequired,
  iconDownloadUrl: PropTypes.string.isRequired,
  sourceFileName: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  appBannerFile: PropTypes.string.isRequired,
  appIconFile: PropTypes.string.isRequired,
  appSourceFile: PropTypes.string.isRequired,
  appDetails: PropTypes.string.isRequired,
  onInputChangedHandlerAD: PropTypes.func.isRequired,
  onFileInputChangedHandlerAD: PropTypes.func.isRequired,
  onLoadAppDetails: PropTypes.func.isRequired,
  onUpdateDownloadUrls: PropTypes.func.isRequired,
  onUpdateFile: PropTypes.func.isRequired,
  onResetAppDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  token: state.auth.token,
  userId: state.auth.userId,
  loading: state.appDetails.loading,
  apps: state.apps.apps,
  bannerDownloadUrl: state.appDetails.appBannerFile.downloadUrl,
  iconDownloadUrl: state.appDetails.appIconFile.downloadUrl,
  sourceFileName: state.appDetails.appSourceFile.sourceFileName,
  appName: state.appDetails.appDetails.appName,
  description: state.appDetails.appDetails.description,
  category: state.appDetails.appDetails.category,
  appBannerFile: state.appDetails.appBannerFile,
  appIconFile: state.appDetails.appIconFile,
  appSourceFile: state.appDetails.appSourceFile,
  appDetails: state.appDetails.appDetails,
});

const mapDispatchToProps = (dispatch) => ({
  onInputChangedHandlerAD: (event, inputIdentifier) => dispatch(
    actions.inputChangedHandlerAD(event, inputIdentifier),
  ),
  onFileInputChangedHandlerAD: (event, inputIdentifier) => dispatch(
    actions.fileInputChangedHandlerAD(event, inputIdentifier),
  ),
  onLoadAppDetails: (appDetails) => dispatch(actions.loadAppDetails(appDetails)),
  onUpdateDownloadUrls: (urls) => dispatch(actions.updateDownloadUrls(urls)),
  onUpdateFile: (files, userId, appId, path) => dispatch(
    actions.updateFile(files, userId, appId, path),
  ),
  onResetAppDetails: () => dispatch(actions.resetAppDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails);
