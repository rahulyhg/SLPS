import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;

    switch(props.inputtype){
        case('input'):
            inputElement = <input className={classes.InputElement} {...props}/>;
            break;
        case('inputarea'):
            inputElement = <inputarea className={classes.InputElement} {...props}/>;
            break;
        default:
            inputElement = <inptu className={classes.InputElement} {...props}/>;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}:</label>
            {inputElement}
        </div>
        );
}

export default Input;