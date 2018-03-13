import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import AuxWrapper from '../../../hoc/AuxWrapper';
import classes from './Modal.css';

const modal = (props) => {
    return (
        <AuxWrapper>
            <Backdrop show={props.show} />
            <div className={classes.Modal}
                style={{
                    transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : props.show ? 1 : 0
                }}>
                {props.children}
            </div>
        </AuxWrapper>
    )
}

export default modal;