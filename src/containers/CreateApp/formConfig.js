export const createAppForm = {
    title: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Title'
        },
        value: '',
        validation: {
            required: true,
            isEmail: false
        },
        valid: false,
        touched: false
    },
    description: {
        elementType: 'textarea',
        elementConfig: {
            type: 'textarea',
            placeholder: 'Description',
            minLength: 6
        },
        value: '',
        validation: {
            required: true,
            isEmail: false
        },
        valid: false,
        touched: false
    },
    category: {
        elementType: 'select',
        elementConfig: {
            header: 'Category',
            options: [
                { value: 'Auto & Vehicles', displayValue: 'Auto & Vehicles'},
                { value: 'Books', displayValue: 'Books'}, 
                { value: 'Business', displayValue: 'Business'},
                { value: 'Communication', displayValue: 'Communication'},
                { value: 'Education', displayValue: 'Education'},
                { value: 'Entertainment', displayValue: 'Entertainment'},
                { value: 'Finance', displayValue: 'Finance'},
                { value: 'Food & Drink', displayValue: 'Food & Drink'},
                { value: 'Maps & Navigation', displayValue: 'Maps & Navigation'},
                { value: 'News & Magazines', displayValue: 'News & Magazines'},
                { value: 'Shopping', displayValue: 'Shopping'},
                { value: 'Social', displayValue: 'Social'},
                { value: 'Travel & Local', displayValue: 'Travel & Local'},
                { value: 'Weather', displayValue: 'Weather'}
            ]
        },
        value: 'Auto & Vehicles',
        validation: {},
        valid: true
    },
    appSourceFile: {
        elementType: 'input',
        elementConfig: {
            type: 'file',
            header: 'Upload App File'
        },
        value: '',
        validation: {
            required: true,
            isEmail: false
        },
        valid: false,
        touched: false
    },
    appBannerFile: {
        elementType: 'input',
        elementConfig: {
            type: 'file',
            header: 'Upload App Banner Image'
        },
        value: '',
        validation: {
            required: true,
            isEmail: false
        },
        valid: false,
        touched: false
    },
    appIconFile: {
        elementType: 'input',
        elementConfig: {
            type: 'file',
            header: 'Upload App Icon Image'
        },
        value: '',
        validation: {
            required: true,
            isEmail: false
        },
        valid: false,
        touched: false
    },
}