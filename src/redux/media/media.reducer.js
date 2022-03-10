import * as actions from "./media.actionTypes";

const INITIAL_STATE = {
  mediaLibraries: [],
  currentMediaLibrary: null,
  currentMediaFile: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_MEDIA_LIBRARIES:
      return {
        ...state,
        mediaLibraries: action.payload,
      };

    case actions.SET_CURRENT_MEDIA_LIBRARY:
      return {
        ...state,
        currentMediaLibrary: action.payload,
      };

    case actions.SET_CURRENT_MEDIA_FILE:
      return {
        ...state,
        currentMediaFile: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
