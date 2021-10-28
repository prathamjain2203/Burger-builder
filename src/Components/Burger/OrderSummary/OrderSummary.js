import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/auxilliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const order = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Your delicious burger with ingredients listed below:</p>
        <ul>{order}</ul>
        <p>Proceed to checkout</p>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>
          PROCEED
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
