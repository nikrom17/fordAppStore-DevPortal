import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
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

  async componentWillMount() {
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
    event.preventDefault();
    this.setState({ isLoading: true });

    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;

    const appInfo = {
      appName: this.props.title,
      category: this.props.category,
      description: this.props.description,
      status: 'live',
      lastUpdate: today,
      avgRating: '-',
      activeInstalls: '0',
      devName: this.props.devName,
      iconKey: this.props.appIconFile,
      bannerKey: this.props.appBannerFile,
      userId: this.props.userId,
    };
    this.props.onCreateApp(appInfo, this.props.token, this.props.history);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    event.target.files
      ? this.props.onFileInputChangedHandlerAD(event, inputIdentifier)
      : this.props.onInputChangedHandlerAD(event, inputIdentifier);
    const updatedFormElement = updateObject(this.state[this.state.formName][inputIdentifier], {
      valid: checkValidity(event.target.value, this.state[this.state.formName][inputIdentifier].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(this.state[this.state.formName], {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ [this.state.formName]: updatedOrderForm, formIsValid });
  }

  switchForms = () => {
    if (this.state.formName === 'publishAppForm') {
      this.setState({ formName: 'editAppDetailsForm' });
    } else {
      this.setState({ formName: 'publishAppForm' });
    }
  }

  updateAppDetails = () => {
    let files;
    let path;
    if (this.props.appBannerFile.fileObject !== null) {
      files = {
        oldFile: this.props.apps[this.state.appIndex].bannerFileName,
        newFile: this.props.appBannerFile.fileObject,
      };
      path = 'images/banner';
      this.props.onUpdateFile(files, { userId: this.props.userId, token: this.props.token }, this.props.apps[this.state.appIndex].id, path);
    }
    if (this.props.appIconFile.fileObject !== null) {
      files = {
        oldFile: this.props.apps[this.state.appIndex].iconFileName,
        newFile: this.props.appIconFile.fileObject,
      };
      path = 'images/icon';
      this.props.onUpdateFile(files, { userId: this.props.userId, token: this.props.token }, this.props.apps[this.state.appIndex].id, path);
    }
    if (this.props.appSourceFile.fileObject !== null) {
      files = {
        oldFile: this.props.apps[this.state.appIndex].sourceFileName,
        newFile: this.props.appSourceFile.fileObject,
      };
      path = 'source';
      this.props.onUpdateFile(files, { userId: this.props.userId, token: this.props.token }, this.props.apps[this.state.appIndex].id, path);
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
    let form = <Spinner />;
    let buttons;
    if (this.state.formName === 'publishAppForm') {
      buttons = (
        <Aux>
          <Button clicked={this.switchForms} btnType="Success">Edit App Details</Button>
          <Button clicked={this.handleSubmit} btnType="Success" disabled={!this.state.formIsValid}>Publish App</Button>
        </Aux>
      );
    } else {
      buttons = (
        <Aux>
          <Button clicked={this.switchForms} btnType="Success">Cancel Edits</Button>
          <Button clicked={this.updateAppDetails} btnType="Success">Save Changes</Button>
        </Aux>
      );
    }
    if (!this.props.loading) {
      const formElementsArray = [];
      for (const key in this.state[this.state.formName]) {
        formElementsArray.push({
          id: key,
          config: this.state[this.state.formName][key],
        });
      }
      form = (
        <Form>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              header={formElement.config.elementConfig.header}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={this.props[formElement.id]}
              src={this.props[formElement.id]}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              readOnly={this.state.formName !== 'editAppDetailsForm'}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
          <div style={{ textAlign: 'right' }}>
            {buttons}
          </div>
        </Form>
      );
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

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
  onInputChangedHandlerAD: (event, inputIdentifier) => dispatch(actions.inputChangedHandlerAD(event, inputIdentifier)),
  onFileInputChangedHandlerAD: (event, inputIdentifier) => dispatch(actions.fileInputChangedHandlerAD(event, inputIdentifier)),
  onLoadAppDetails: (appDetails) => dispatch(actions.loadAppDetails(appDetails)),
  onUpdateDownloadUrls: (urls) => dispatch(actions.updateDownloadUrls(urls)),
  onUpdateFile: (files, userId, appId, path) => dispatch(actions.updateFile(files, userId, appId, path)),
  onResetAppDetails: () => dispatch(actions.resetAppDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails);
