import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";


class Orders extends Component {

  componentDidMount(){
    this.props.onFetchOrders(this.props.token,this.props.userId);
  }
  render() {
    let orders = <Spinner/>;
    if(!this.props.loading){
     orders = this.props.orders.map((order)=> (
          <Order
            key={order.id}
            price={+order.price}
            ingredients={order.ingredients}
          />
     ))
    }
    return (
      orders
    );
  }
}

const mapStateToProps = state =>{
  return {
    orders : state.order.orders,
    loading : state.order.loading,
    token : state.auth.token,
    userId : state.auth.userId
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    onFetchOrders : (token,userId)=>   dispatch(actions.fetchOrders(token,userId))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
