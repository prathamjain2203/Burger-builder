import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactForm/ContactData";
import { Route , Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Checkout extends Component {
  
  continueCheckoutHandler = () => {
    this.props.history.replace("./checkout/contact-data");
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };
  
  render() {
    let summary = <Redirect to ="/"/>
    if(this.props.ings){
      summary = <div>
      <CheckoutSummary
        ingredients={this.props.ings}
        cancelCheckout={this.cancelCheckoutHandler}
        continueCheckout={this.continueCheckoutHandler}
      />
      <Route
        path={this.props.match.path + "/contact-data"}
        component={ContactData}
      />
    </div>
    }
    return summary
  }
}
const mapStateToProps = state =>{
  return {
   ings : state.burgerBuilder.ingredients
  }
}
export default connect(mapStateToProps)(Checkout);
