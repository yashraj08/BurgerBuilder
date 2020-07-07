import React,{ Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'; 
import Orders from './containers/Orders/Orders';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Layout>
       <Route path="/" exact component={BurgerBuilder} />
       <Route path="/orders" component={Orders} />
       <Route path="/checkout" component={Checkout} />
      </Layout>
    </div>
  );
}

export default App;
