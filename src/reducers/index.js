import { combineReducers } from "redux";
import auth from "./auth";
import productsReducer from "./productsReducer"
import customersReducer from "./customersReducer"

export default combineReducers(
    { 
        auth, 
        productsReducer,
        customersReducer
     });