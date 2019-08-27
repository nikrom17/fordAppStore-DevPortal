const createAppForm = {
  title: {
    type: 'input',
    config: {
      type: 'text',
      placeholder: 'Title',
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
  appSourceFile: {
    type: 'input',
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
  appBannerFile: {
    type: 'input',
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
    type: 'input',
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
};

export default createAppForm;
