import React from 'react';
import classes from './Backdrop.css';

const backDrop = (props) => {
    console.log('showing backdrop...' + props.show);
    return props.show ? <div className={classes.Backdrop} onClick={props.backDropClicked}></div> : null;
}

export default backDrop;