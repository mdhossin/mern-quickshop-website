import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
// eta muloto browser er redux devtool dekhar jonno

import { composeWithDevTools } from "@redux-devtools/extension";

const middleware = [thunk];

let initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
