import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
// TODO: only add 'logger' if in dev mode
const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
