import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Urls from '../../../core/Urls';

class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
    }

    render(){
        return (
            <Redirect to={Urls.base} />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);