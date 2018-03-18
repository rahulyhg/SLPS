import React, {Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import AuxWrapper from '../../../hoc/AuxWrapper';
import classes from './Modal.css';

class Modal extends Component {
    
    shouldComponentUpdate(nextProps, nextState, nextContext){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(nextProps, nextState, nextContext){
        console.log('Modal.js componentWillupdate', nextContext);
    }
    render(){
        return (
            <AuxWrapper>
                <Backdrop show={this.props.show} backDropClicked={this.props.modalClicked}/>
                <div className={classes.Modal}
                    style={{
                        transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity : this.props.show ? 1 : 0
                    }}>
                    {this.props.children}
                </div>
            </AuxWrapper>
        )}
}

export default Modal;