export const loginForm = {
  email: {
    type: 'input',
    config: {
      type: 'email',
      placeholder: 'E-Mail Address',
    },
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
  password: {
    type: 'input',
    config: {
      type: 'password',
      placeholder: 'Password',
      minLength: 6,
    },
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
};

export const signupForm = {
  developerName: {
    type: 'input',
    config: {
      type: 'text',
      placeholder: 'Developer Name',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  website: {
    type: 'input',
    config: {
      type: 'url',
      placeholder: 'website',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  phone: {
    type: 'input',
    config: {
      type: 'phone',
      placeholder: 'Phone Number',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  email: {
    type: 'input',
    config: {
      type: 'email',
      placeholder: 'E-Mail Address',
    },
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
  password: {
    type: 'input',
    config: {
      type: 'password',
      placeholder: 'Password',
      minLength: 6,
    },
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
  confirmPassword: {
    type: 'input',
    config: {
      type: 'password',
      placeholder: 'Password',
      minLength: 6,
    },
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  },
};
