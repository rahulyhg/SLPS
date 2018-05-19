import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from '../src/hoc/layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Urls from './core/Urls';

class App extends Component {
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

export default App;
