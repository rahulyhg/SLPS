import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const elementClasses = [classes.InputElement];
    if (!props.valid){
        elementClasses.push(classes.Invalid);
    }
    const inputElementClass = elementClasses.join(' ');
    switch(props.elementType){
        case('input'):
            inputElement = <input className={inputElementClass}
                onChange={props.changed} 
                {...props.elementConfig} 
                value={props.value}/>;
            break;
        case('inputarea'):
            inputElement = <inputarea className={inputElementClass}
                onChange={props.changed} 
                {...props.elementConfig} 
                value={props.value}/>;
            break;
        case('select'):
            inputElement = <select className={inputElementClass}
                onChange={props.changed}
                value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value}
                        value={option.value}>{option.display}</option>)
                )}
            </select>
            break;
        default:
            inputElement = <input className={inputElementClass}
                onChange={props.changed}
                {...props.elementConfig} 
                value={props.value}/>;
                break;
    }
    const errorMessages = props.errorMessages ? 
        props.errorMessages.map(message => <ErrorMessage message={message} key={message}></ErrorMessage>) : null;
    const validationError = props.errorMessages ? errorMessages : null;

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label ? `${props.label}:` : ''}</label>
            {inputElement}
            {validationError}
        </div>
        );
}

export const ErrorMessage = (props) => {
    return (
        <p className={classes.ErrorMessage} {...props}>{props.message}</p>
    );
}

export default Input;