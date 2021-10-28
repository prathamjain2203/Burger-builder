import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get("./order.json")
      .then((response) => {
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({ ...response.data[key], id: key });
        }

        this.setState({ loading: false, orders: fetchOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => {
          return (
            <Order
              key={order.id}
              price={+order.price}
              ingredients={order.ingredients}
            />
          );
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
