import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactForm/ContactData";
import { Route } from "react-router-dom";
class Checkout extends Component {
  state = {
    ingredients: null,
    totalprice: 0,
  };
  continueCheckoutHandler = () => {
    this.props.history.replace("./checkout/contact-data");
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalprice: price });
  }
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          totalprice={this.state.totalprice}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              totalPrice={this.state.totalprice}
              ingredients={this.state.ingredients}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
