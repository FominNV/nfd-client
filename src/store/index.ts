import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { adminReducer } from "./admin/reducer";
import { commonReducer } from "./common/reducer";
import { userReducer } from "./user/reducer";

export type RootState = ReturnType<typeof combinedReducer>;

const combinedReducer = combineReducers({
  common: commonReducer,
  admin: adminReducer,
  user: userReducer,
});

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  combinedReducer,
  {},
  composeEnhancers(applyMiddleware(thunk)),
);
