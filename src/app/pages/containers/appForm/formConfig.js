const createAppForm = {
  config: {
    byId: {
      appName: {
        type: 'text',
        placeholder: 'App name',
        headerText: 'App name',
      },
      description: {
        type: 'textarea',
        placeholder: 'Description',
        headerText: 'Description',
        minLength: 6,
      },
      category: {
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
      source: {
        headerText: 'Upload App File',
      },
      banner: {
        type: 'image',
        headerText: 'Upload App Banner Image',
      },
      icon: {
        type: 'image',
        headerText: 'Upload App Icon Image',
      },
    },
  },
  type: {
    byId: {
      appName: 'input',
      description: 'textarea',
      category: 'select',
      source: 'file',
      banner: 'file',
      icon: 'file',
    },
  },
  validation: {
    byId: {
      appName: {
        required: true,
        isEmail: false,
      },
      description: {
        required: true,
        isEmail: false,
      },
      category: {
        required: true,
        isEmail: false,
      },
      source: {
        required: true,
        isEmail: false,
      },
      banner: {
        required: true,
        isEmail: false,
      },
      icon: {
        required: true,
        isEmail: false,
      },
    },
  },
  allIds: ['appName', 'description', 'category', 'source', 'banner', 'icon'],
};

export default createAppForm;
