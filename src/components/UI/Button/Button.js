import React from 'react';
import classes from './Button.css';

const button = (props) => {
    const btnClasses = [classes.Button, props.btnType].join(' ');
    console.log('Button.js props.btnType:' , props.btnType)
    console.log('Button.js btnClasses:',btnClasses);
    return (
        <button onClick={props.clicked}
            className={btnClasses}>
        {props.children}
        </button>
    )
}
export default button;