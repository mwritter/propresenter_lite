import { combineReducers } from "redux";

import libraryReducer from "./library/library.reducer";
import mediaReducer from "./media/media.reducer";

export default combineReducers({
  library: libraryReducer,
  media: mediaReducer,
});
