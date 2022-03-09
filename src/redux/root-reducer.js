import { combineReducers } from "redux";

import libraryReducer from "./library/library.reducer";

export default combineReducers({
  library: libraryReducer,
});
