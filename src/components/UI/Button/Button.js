import React from 'react';
import classes from './Button.css';

const button = (props) => {
    const btnClasses = [classes.Button];
    switch (props.btnType){
        case "Success":
            btnClasses.push(classes.Success);
            break;
        case "Danger":
            btnClasses.push(classes.Danger);
            break;
        default:
            
    }
    return (
        <button onClick={props.clicked}
            className={btnClasses.join(' ')}>
        {props.children}
        </button>
    )
}
export default button;