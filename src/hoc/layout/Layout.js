import React, {Component} from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SiddeDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer : false
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer : false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer};
        })
    }
    render(){
        return(
            <AuxWrapper>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </AuxWrapper>
        );
    }
}
export default Layout;