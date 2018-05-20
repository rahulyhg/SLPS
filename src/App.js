import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from '../src/hoc/layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout'
//import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Urls from './core/Urls';

const asyncCheckout = asyncComponent((() => {
  return import('./containers/Checkout/Checkout');
}));

const asyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated){

      this.props.onTryAutoSignIn();
    }
  }
  render() {
    const routes = this.props.isAuthenticated ? 
      ( <Switch>
          <Route path={Urls.checkout} component={asyncCheckout} />
          <Route path={Urls.orders} component={asyncOrders} />
          <Route path={Urls.auth} component={Auth} />
          <Route path={Urls.logout} component={Logout} />
          <Route path={Urls.base} component={BurgerBuilder} exact />
          <Redirect to={Urls.base} />
        </Switch>
      ): (
        <Switch>
          <Route path={Urls.auth} component={Auth} />
          <Route path={Urls.base} component={BurgerBuilder} exact />
          <Redirect to={Urls.base} />
        </Switch>
      )
    return (
      <div>
        <Layout>
          {routes}
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
