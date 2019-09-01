export const accountInfo = {
  config: {
    byId: {
      devName: {
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
    },
  },
  validation: {
    byId: {
      devName: {
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
    },
  },
  type: {
    byId: {
      devName: 'input',
      email: 'input',
      phone: 'input',
      website: 'input',
    },
  },
  allIds: ['devName', 'email', 'phone', 'website'],
};

export default accountInfo;
