import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createStore,applyMiddleware,compose,combineReducers } from "redux";
import burgerBuilderReducer from "./store/reducer/BurgerBuilder";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import thunk from "redux-thunk"
import orderReducer from "./store/reducer/order";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder : burgerBuilderReducer,
  order : orderReducer
})

const store = createStore(rootReducer , composeEnhancer(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
