import { combineReducers } from "redux";
import userReducer from "./UserSlice";
import adminReducer from "./adminSlice";
import doorReducer from "./doorSlice";
import suggestionReducer from "./suggetionsSlice";
import quotationReducer from "./quotationSlice";

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  door: doorReducer,
  suggestion: suggestionReducer,
  quotation: quotationReducer,
});

export default rootReducer;
