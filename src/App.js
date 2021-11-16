import React, { Component } from "react";
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as actions from "./store/actions/index"
import { Redirect, withRouter } from "react-router";
import Auth from "./Containers/Auth/Auth"
import Orders from "./Containers/Orders/Orders";
import Logout from "./Containers/Auth/Logout/Logout";

class App extends Component {

componentDidMount(){
  this.props.onTryAutoSignUp()
}

  render() {
    let routes = (
      <Switch>
      <Route path ="/auth" component={Auth}/>
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>
    </Switch>
    )
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path ='/logout' component={Logout}/>
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
      )
    }
    return (
      <div>
        <Layout>
        {routes}
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps=dispatch=> {
  return {
    onTryAutoSignUp : ()=> dispatch(actions.checkAuthStatus())
  }
}

const mapStateToProps = state => {return {
  isAuthenticated : state.auth.token !==null
}}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
