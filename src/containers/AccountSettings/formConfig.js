const accountSettingsForm = {
  developerName: {
    type: 'input',
    config: {
      type: 'text',
      headerText: 'Developer Name',
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
    type: 'input',
    config: {
      type: 'text',
      headerText: 'Email Address',
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
    type: 'input',
    config: {
      type: 'url',
      headerText: 'Website',
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
    type: 'input',
    config: {
      type: 'tel',
      headerText: 'Phone Number',
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
