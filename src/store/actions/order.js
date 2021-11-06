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
         dispatch(purchaseBurgerSuccess(response.data.name,order))
     }).catch((error)=>{
         dispatch(purchaseBurgerFailed(error))
     })
        };
    }

  