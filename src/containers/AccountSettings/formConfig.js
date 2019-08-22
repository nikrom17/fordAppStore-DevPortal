const accountSettingsForm = {
  developerName: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      header: 'Developer Name',
      placeholder: 'Developer Name',
    },
    validation: {
      required: true,
      isEmail: false,
    },
    valid: true,
    touched: false,
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      header: 'Email Address',
      placeholder: 'Email Address',
      minLength: 6,
    },
    validation: {
      required: true,
      isEmail: true,
    },
    valid: true,
    touched: false,
  },
  website: {
    elementType: 'input',
    elementConfig: {
      type: 'url',
      header: 'Website',
      placeholder: 'Website',
    },
    validation: {
      required: true,
      isEmail: false,
    },
    valid: true,
    touched: false,
  },
  phone: {
    elementType: 'input',
    elementConfig: {
      type: 'tel',
      header: 'Phone Number',
      placeholder: 'Phone Number',
    },
    validation: {
      required: true,
      isEmail: false,
    },
    valid: true,
    touched: false,
  },
};

export default accountSettingsForm;
