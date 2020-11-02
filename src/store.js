import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import appReducer from "./components/reducers/Reducer";
const middleware = [ReduxThunk];
export default createStore(appReducer, applyMiddleware(...middleware));
