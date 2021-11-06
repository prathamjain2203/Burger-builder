import * as actionTypes from "../actions/actionTypes";

const initialState ={
    ingredients : null,
    totalPrice : 4,
    error: false
   
}
const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.6,
    bacon: 0.7,
    meat: 1.3,
  };
  

const burgerBuilderReducer = (state= initialState , action) => {
     switch(action.type){
case actionTypes.SET_INGREDIENTS:
    return {
        ...state,
        ingredients : action.ingredients,
        error : false
    }

    case actionTypes.FETCH_INGREDIENTS_FAILED :
        return {
...state,
error : true
        }
         case actionTypes.ADD_INGREDIENT :
                 
             return {
                ...state,
                ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] +1,
                        },
                        totalPrice : state.totalPrice + INGREDIENTS_PRICE[action.ingredientName] ,
                      
            
                    }
     


     case actionTypes.REMOVE_INGREDIENT :
      
        return {
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] -1,
                },
            totalPrice : state.totalPrice - INGREDIENTS_PRICE[action.ingredientName] ,


        }
    
    default : 
        return state
}

}
export default burgerBuilderReducer;
