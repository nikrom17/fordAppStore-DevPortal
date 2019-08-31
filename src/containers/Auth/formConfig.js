export const login = {
  config: {
    byId: {
      email: {
        type: 'email',
        placeholder: 'E-Mail Address',
      },
      password: {
        type: 'password',
        placeholder: 'Password',
      },
    },
  },
  validation: {
    byId: {
      email: {
        required: true,
        isEmail: true,
      },
      password: {
        required: true,
        minLength: 6,
      },
    },
  },
  type: {
    byId: {
      email: 'input',
      password: 'input',
    },
  },
  allIds: ['email', 'password'],
};

export const signup = {
  config: {
    byId: {
      developerName: {
        type: 'text',
        placeholder: 'Developer name',
      },
      email: {
        type: 'email',
        placeholder: 'E-Mail address',
      },
      phone: {
        type: 'phone',
        placeholder: 'Phone number',
      },
      website: {
        type: 'url',
        placeholder: 'Website',
      },
      password: {
        type: 'password',
        placeholder: 'Password',
      },
      confirmPassword: {
        type: 'password',
        placeholder: 'Confirm password',
      },
    },
  },
  validation: {
    byId: {
      developerName: {
        required: true,
        isEmail: false,
      },
      email: {
        required: true,
        isEmail: true,
      },
      phone: {
        required: true,
        isEmail: false,
      },
      website: {
        required: true,
        isEmail: false,
      },
      password: {
        required: true,
        isEmail: false,
        minLength: 6,
      },
      confirmPassword: {
        required: true,
        isEmail: false,
        minLength: 6,
      },
    },
  },
  type: {
    byId: {
      developerName: 'input',
      email: 'input',
      phone: 'input',
      website: 'input',
      password: 'input',
      confirmPassword: 'input',
    },
  },
  allIds: ['developerName', 'email', 'phone', 'website', 'password', 'confirmPassword'],
};
