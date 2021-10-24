import fetchtableList from "./reducerfetchTableList";
import productsReducer from "./productsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  fetchtableList, 
  productsList: productsReducer,
});

export default rootReducer;
