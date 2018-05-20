import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import Layout from '../src/hoc/layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Urls from './core/Urls';

class App extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated){

      this.props.onTryAutoSignIn();
    }
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
          <Route path={Urls.checkout} component={Checkout} />
          <Route path={Urls.orders} component={Orders} />
          <Route path={Urls.auth} component={Auth} />
          <Route path={Urls.logout} component={Logout} />
          <Route path={Urls.base} component={BurgerBuilder} exact />
          </Switch>
        </Layout>        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn : () => dispatch(actions.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
