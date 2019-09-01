const createAppForm = {
  config: {
    byId: {
      title: {
        type: 'text',
        placeholder: 'Title',
      },
      description: {
        type: 'textarea',
        placeholder: 'Description',
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
      sourceFile: {
        type: 'file',
        headerText: 'Upload App File',
      },
      bannerFile: {
        type: 'file',
        headerText: 'Upload App Banner Image',
      },
      iconFile: {
        type: 'file',
        headerText: 'Upload App Icon Image',
      },
    },
  },
  type: {
    byId: {
      title: 'input',
      description: 'textarea',
      category: 'select',
      sourceFile: 'file',
      bannerFile: 'file',
      iconFile: 'file',
    },
  },
  validation: {
    byId: {
      title: {
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
      sourceFile: {
        required: true,
        isEmail: false,
      },
      bannerFile: {
        required: true,
        isEmail: false,
      },
      iconFile: {
        required: true,
        isEmail: false,
      },
    },
  },
  allIds: ['title', 'description', 'category', 'sourceFile', 'bannerFile', 'iconFile'],
};

export default createAppForm;
