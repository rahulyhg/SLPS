import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import AuxWrapper from '../../../hoc/AuxWrapper';
import Urls from '../../../core/Urls';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems} >
        <NavigationItem link={Urls.base} exact>Burger Builder</NavigationItem>
        {props.isAuthenticated 
            ? 
            <AuxWrapper>
                <NavigationItem link={Urls.orders}>Orders</NavigationItem>
                <NavigationItem link={Urls.logout}>Logout</NavigationItem>
            </AuxWrapper>
            : <NavigationItem link={Urls.auth} >Login </NavigationItem>
        }
    </ul>
)
export default navigationItems;
