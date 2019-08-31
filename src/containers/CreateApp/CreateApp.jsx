import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/inputRender/inputRender';
import Button from '../../components/UI/Button/Button';
import { updateObject, validateValue, getDate } from '../../shared/utility';
import createAppForm from './formConfig';
import * as actions from '../../store/actions/index';

class CreateApp extends Component {
  constructor() {
    super();
    this.state = {
      createAppForm,
      formIsValid: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    const { token, userId } = this.props;
    event.preventDefault();

    const appInfo = {
      appName: this.props.title,
      category: this.props.category,
      description: this.props.description,
      status: 'draft',
      lastUpdate: getDate(),
      avgRating: '-',
      activeInstalls: '0',
      devName: this.props.devName,
      iconFileName: this.props.appIconFile.fileObject.name,
      bannerFileName: this.props.appBannerFile.fileObject.name,
      sourceFileName: this.props.appSourceFile.fileObject.name,
      userId: this.props.userId,
    };
    const imagesToUpload = {
      banner: this.props.appBannerFile.fileObject,
      icon: this.props.appIconFile.fileObject,
    };
    const files = {
      source: this.props.appSourceFile.fileObject,
      images: imagesToUpload,
    };
    const auth = {
      token,
      userId,
    };
    this.props.onCreateApp(appInfo, files, auth, this.props.history);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    event.target.files
      ? this.props.onFileInputChangedHandler(event, inputIdentifier)
      : this.props.onInputChangedHandler(event, inputIdentifier);

    const updatedFormElement = updateObject(this.state.createAppForm[inputIdentifier], {
      valid: validateValue(event.target.value, this.state.createAppForm[inputIdentifier].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(this.state.createAppForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ createAppForm });
    this.setState({ createAppForm: updatedOrderForm, formIsValid });
  }

  render() {
    const { createAppForm, formIsValid } = this.state;
    const formElementsArray = [];
    const formKeys = Object.keys(createAppForm);

    formKeys.map((key) => (
      formElementsArray.push({
        id: key,
        config: createAppForm[key],
      })
    ));
    const form = (
      <Form>
        {formElementsArray.map((formElement) => {
          const value = formElement.config.elementConfig.type === 'file'
            ? this.props[formElement.id].value
            : this.props[formElement.id];
          return (
            <Input
              key={formElement.id}
              header={formElement.config.elementConfig.header}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          );
        })}
        <Button
          clicked={this.handleSubmit}
          disabled={!formIsValid}
          title="Create App"
          type="submit"
        />
      </Form>
    );
    return (
      <>
        {form}
      </>
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
