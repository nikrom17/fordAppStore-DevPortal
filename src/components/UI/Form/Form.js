import React from 'react';
import classes from './Form.css';

const form = (props) => {
    return (
        <div className={classes.Form}>
            {props.children}
        </div>
    );
}

export default form;