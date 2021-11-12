import * as actionTypes from "../actions/actionTypes"

const initialState ={
    orders : [],
    loading : false,
    purchased : false
}
const orderReducer = (state = initialState ,action)=> {

    switch(action.type){
case actionTypes.PURCHASE_BURGER_SUCCESS :
    const newOrder = {
      ...action.orderData,
      id: action.orderId
    }
    return {
...state,
loading:false,
purchased : true,
orders : state.orders.concat(newOrder)
    }
    case actionTypes.PURCHASE_BURGER_FAILED :
        return {
            ...state,
            loading : false

        }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading : true
            }
            
    case actionTypes.PURCHASE_INIT : 
    return {
...state , 
purchased : false

    }
case actionTypes.FETCH_ORDES_START :
    return {
        ...state,
        loading : true,

    }
    case actionTypes.FETCH_ORDES_SUCCESS : 
    return {
        ...state,
        loading : false,
        orders : action.orders
    }
    case actionTypes.FETCH_ORDES_FAIL: 
    return {
        ...state,
        loading : false
    }

        default : return state;
    }

}

export default orderReducer;