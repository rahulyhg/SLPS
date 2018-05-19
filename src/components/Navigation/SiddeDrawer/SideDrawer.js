import React from 'react';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import AuxWrapper from '../../../hoc/AuxWrapper';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let assignedClasses = [classes.SideDrawer, classes.Close];
    if (props.open){
        assignedClasses = [classes.SideDrawer, classes.Open];
    }
    let transformedClasses = assignedClasses.join (' ');
    return (
        <AuxWrapper>
            <BackDrop show={props.open} 
                backDropClicked={props.closed}
                />
            <div className={transformedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </div>
        </AuxWrapper>
    );
}

export default sideDrawer;