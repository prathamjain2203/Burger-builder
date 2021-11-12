import * as actionTypes from "./actionTypes";
import axios from "../../axios";


export const purchaseBurgerSuccess = (id, orderData)=>{
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}
export const purchaseBurgerFailed = (error)=>{
    return {
        type : actionTypes.PURCHASE_BURGER_FAILED,
        error : error
    }
}

export const purchaseBurgerStart = ()=>{
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}
export const initPurchaseBurger =(order)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
     axios.post('/order.json',order)    
     .then((response)=>{
         dispatch(purchaseBurgerSuccess(response.data.name,order));
     }).catch((error)=>{
         dispatch(purchaseBurgerFailed(error))
     })
        };
    }
export const onPurchaseInit = ()=>{
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders)=>{
    return {
type : actionTypes.FETCH_ORDES_SUCCESS,
orders : orders

    }
} 
export const fetchOrdersFail = (error)=>{
    return {
type : actionTypes.FETCH_ORDES_FAIL,
error : error

    }
} 
export const fetchOrdersStart = ()=>{
    return {
type : actionTypes.FETCH_ORDES_START,

    }
}

export const fetchOrders = ()=>{
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get("./order.json")
      .then((response) => {
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({ ...response.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
       
      });
    }
}
  