import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Urls from '../../../core/Urls';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems} >
        <NavigationItem link={Urls.base} exact>Burger Builder</NavigationItem>
        <NavigationItem link={Urls.orders} >Orders </NavigationItem>
    </ul>
)
export default navigationItems;
