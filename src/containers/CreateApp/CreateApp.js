import React, { Component } from 'react';
import { connect } from 'react-redux';

//import classes from './CreateApp.css';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';
import { createAppForm } from './formConfig';
import * as actions from '../../store/actions/index';

class CreateApp extends Component {
  state = {
      createAppForm: createAppForm,
      formIsValid: false
    };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const appInfo = {
      appName: this.props.title,
      category: this.props.category,
      description: this.props.description,
      status: "draft",
      lastUpdate: today,
      avgRating: "-",
      activeInstalls: "0",
      devName: this.props.devName,
      iconFileName: this.props.appIconFile.fileObject.name,
      bannerFileName: this.props.appBannerFile.fileObject.name,
      sourceFileName: this.props.appSourceFile.fileObject.name,
      userId: this.props.userId
    }
    const imagesToUpload = {
      banner: this.props.appBannerFile.fileObject,
      icon: this.props.appIconFile.fileObject
    }
    const files = {
      source: this.props.appSourceFile.fileObject,
      images: imagesToUpload
    }
    const auth = {
      token: this.props.token,
      userId: this.props.userId
    }
    console.log(this.props.history);
    this.props.onCreateApp(appInfo, files, auth, this.props.history);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    event.target.files ? 
      this.props.onFileInputChangedHandler(event, inputIdentifier) : 
        this.props.onInputChangedHandler(event, inputIdentifier)
    
    const updatedFormElement = updateObject(this.state.createAppForm[inputIdentifier], {
        valid: checkValidity(event.target.value, this.state.createAppForm[inputIdentifier].validation),
        touched: true
    });
    const updatedOrderForm = updateObject(this.state.createAppForm, {
        [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ createAppForm})
    this.setState({ createAppForm: updatedOrderForm, formIsValid: formIsValid });
}

  render () {
    let form = <Spinner />;
    if (!this.props.loading) {
      const formElementsArray = [];
        for (let key in this.state.createAppForm) {
          formElementsArray.push({
              id: key,
              config: this.state.createAppForm[key]
          });
        }
        form = (
          <Form>
            {formElementsArray.map( formElement => {
              let value = formElement.config.elementConfig.type === 'file' ? 
                this.props[formElement.id].value : 
                  this.props[formElement.id];
              return (<Input
                key={formElement.id}
                header={formElement.config.elementConfig.header}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} /> );
            })}
            <Button clicked={this.handleSubmit} btnType="Success" disabled={!this.state.formIsValid}>Create App</Button>
          </Form>);
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.createApp.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    devName: state.settings.developerName,
    appSourceFile: state.createApp.appSourceFile,
    appBannerFile: state.createApp.appBannerFile,
    appIconFile: state.createApp.appIconFile,
    title: state.createApp.title,
    description: state.createApp.description,
    category: state.createApp.category,
    fileObjects: state.createApp.fileObjects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChangedHandler: (event, inputIdentifier) => dispatch(actions.inputChangedHandler(event, inputIdentifier)),
    onCreateApp: (appData, files, token, history) => dispatch(actions.createApp(appData, files, token, history)),
    onFileInputChangedHandler: (value, fileObject, inputIdentifier) => dispatch(actions.fileInputChangedHandler(value, fileObject, inputIdentifier))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp);