export const publishAppForm = {
    appName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your app name',
            header: 'App Name'
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
            minLength: 6,
            header: 'App Description'
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
    bannerDownloadUrl: {
        elementType: 'img',
        elementConfig: {
            src: '',
            alt: '',
            header: 'Banner Image'
        },
        value: ''
    },
    iconDownloadUrl: {
        elementType: 'img',
        elementConfig: {
            src: '',
            alt: '',
            header: 'Icon Image'
        },
        value: ''
    },
    sourceFileName: {
        elementType: 'html',
        elementConfig: {
            header: 'App File',
            type: 'p'
        },
        value: '',
    },
}

export const editAppDetailsForm = {
    appName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your app name'
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
    appBannerFile: {
        elementType: 'file',
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
        elementType: 'file',
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
    appSourceFile: {
        elementType: 'file',
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
}