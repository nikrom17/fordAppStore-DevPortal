export const publishAppForm = {
  appName: {
    type: 'input',
    config: {
      type: 'text',
      placeholder: 'Your app name',
      headerText: 'App Name',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  description: {
    type: 'textarea',
    config: {
      type: 'textarea',
      placeholder: 'Description',
      minLength: 6,
      headerText: 'App Description',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  category: {
    type: 'select',
    config: {
      headerText: 'Category',
      options: [
        { value: 'Auto & Vehicles', displayValue: 'Auto & Vehicles' },
        { value: 'Books', displayValue: 'Books' },
        { value: 'Business', displayValue: 'Business' },
        { value: 'Communication', displayValue: 'Communication' },
        { value: 'Education', displayValue: 'Education' },
        { value: 'Entertainment', displayValue: 'Entertainment' },
        { value: 'Finance', displayValue: 'Finance' },
        { value: 'Food & Drink', displayValue: 'Food & Drink' },
        { value: 'Maps & Navigation', displayValue: 'Maps & Navigation' },
        { value: 'News & Magazines', displayValue: 'News & Magazines' },
        { value: 'Shopping', displayValue: 'Shopping' },
        { value: 'Social', displayValue: 'Social' },
        { value: 'Travel & Local', displayValue: 'Travel & Local' },
        { value: 'Weather', displayValue: 'Weather' },
      ],
    },
    value: 'Auto & Vehicles',
    validation: {},
    valid: true,
  },
  bannerDownloadUrl: {
    type: 'img',
    config: {
      src: '',
      alt: '',
      headerText: 'Banner Image',
    },
    value: '',
  },
  iconDownloadUrl: {
    type: 'img',
    config: {
      src: '',
      alt: '',
      headerText: 'Icon Image',
    },
    value: '',
  },
  sourceFileName: {
    type: 'html',
    config: {
      headerText: 'App File',
      type: 'p',
    },
    value: '',
  },
};

export const editAppDetailsForm = {
  appName: {
    type: 'input',
    config: {
      type: 'text',
      placeholder: 'Your app name',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  description: {
    type: 'textarea',
    config: {
      type: 'textarea',
      placeholder: 'Description',
      minLength: 6,
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  category: {
    type: 'select',
    config: {
      headerText: 'Category',
      options: [
        { value: 'Auto & Vehicles', displayValue: 'Auto & Vehicles' },
        { value: 'Books', displayValue: 'Books' },
        { value: 'Business', displayValue: 'Business' },
        { value: 'Communication', displayValue: 'Communication' },
        { value: 'Education', displayValue: 'Education' },
        { value: 'Entertainment', displayValue: 'Entertainment' },
        { value: 'Finance', displayValue: 'Finance' },
        { value: 'Food & Drink', displayValue: 'Food & Drink' },
        { value: 'Maps & Navigation', displayValue: 'Maps & Navigation' },
        { value: 'News & Magazines', displayValue: 'News & Magazines' },
        { value: 'Shopping', displayValue: 'Shopping' },
        { value: 'Social', displayValue: 'Social' },
        { value: 'Travel & Local', displayValue: 'Travel & Local' },
        { value: 'Weather', displayValue: 'Weather' },
      ],
    },
    value: 'Auto & Vehicles',
    validation: {},
    valid: true,
  },
  appBannerFile: {
    type: 'file',
    config: {
      type: 'file',
      headerText: 'Upload App Banner Image',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  appIconFile: {
    type: 'file',
    config: {
      type: 'file',
      headerText: 'Upload App Icon Image',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
  appSourceFile: {
    type: 'file',
    config: {
      type: 'file',
      headerText: 'Upload App File',
    },
    value: '',
    validation: {
      required: true,
      isEmail: false,
    },
    valid: false,
    touched: false,
  },
};
