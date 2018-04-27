import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;

    switch(props.elementType){
        case('input'):
            inputElement = <input className={classes.InputElement}
                onChange={props.changed} 
                {...props.elementConfig} 
                value={props.value}/>;
            break;
        case('inputarea'):
            inputElement = <inputarea className={classes.InputElement}
                onChange={props.changed} 
                {...props.elementConfig} 
                value={props.value}/>;
            break;
        case('select'):
            inputElement = <select className={classes.InputElement}
                onChange={props.changed}
                value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value}
                        value={option.value}>{option.display}</option>)
                )}
            </select>
            break;
        default:
            inputElement = <input className={classes.InputElement}
                onChange={props.changed}
                {...props.elementConfig} 
                value={props.value}/>;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}{props.label ? ':' : ''}</label>
            {inputElement}
        </div>
        );
}

export default Input;