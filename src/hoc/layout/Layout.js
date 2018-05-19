import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuxWrapper from '../../hoc/AuxWrapper';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SiddeDrawer/SideDrawer';

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
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated} 
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </AuxWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.token !== null
    };
}
export default connect(mapStateToProps) (Layout);