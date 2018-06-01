import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import AuxWrapper from '../../../hoc/AuxWrapper';
import Urls from '../../../core/Urls';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems} >
        <NavigationItem link={Urls.base} exact>Home</NavigationItem>
        <NavigationItem link={Urls.Announcements} exact>{"News & Announce"}</NavigationItem>
        <NavigationItem link={Urls.Events} exact>Events</NavigationItem>
        <NavigationItem link={Urls.Gallery} exact>Gallery</NavigationItem>
        <NavigationItem link={Urls.ContactUs} exact>ContactUs</NavigationItem>
        {props.isAuthenticated 
            ? 
            <AuxWrapper>
                <NavigationItem link={Urls.orders}>Orders</NavigationItem>
                <NavigationItem link={Urls.logout}>Logout</NavigationItem>
            </AuxWrapper>
            : <NavigationItem link={Urls.auth} >Login</NavigationItem>
        }
    </ul>
)
export default navigationItems;
