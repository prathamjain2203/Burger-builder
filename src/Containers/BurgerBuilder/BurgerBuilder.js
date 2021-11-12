import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary/auxilliary";
import { connect } from "react-redux";
import axios from "../../axios";
import Burger from "../../Components/Burger/Burger";
import BurgerControls from "../../Components/Burger/BurgerControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index"

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
   return sum > 0;
  }
  componentDidMount(){
    this.props.onInitIngredients();
  }


  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
this.props.onInitPurchase();
    this.props.history.push({
      pathname: "./checkout"
    });
  };

  
  render() {
    let orderSummary = null;

    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            price={this.props.totalPr}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPr}
          purchaseCancelHandler={this.purchaseCancelHandler}
          ingredients={this.props.ings}
          purchaseContinueHandler={this.purchaseContinueHandler}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
return {
  ings:state.burgerBuilder.ingredients,
  totalPr : state.burgerBuilder.totalPrice,
  error :state.burgerBuilder.error

}
}


const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded : (ingredientName)=> dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    onIngredientRemoved : (ingredientName)=> dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    onInitIngredients : ()=> dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase : ()=> dispatch(burgerBuilderActions.onPurchaseInit())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
