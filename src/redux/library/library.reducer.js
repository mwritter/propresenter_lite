import * as actions from "./library.actionTypes";

const INITIAL_STATE = {
  libraries: [],
  currentLibrary: null,
  playlists: [],
  currentPlaylist: null,
  currentFiles: [],
  currentFile: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SET_LIBRARIES:
      return {
        ...state,
        libraries: action.payload,
      };

    case actions.SET_CURRENT_LIBRARY:
      return {
        ...state,
        currentLibrary: action.payload,
      };

    case actions.SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.payload,
      };

    case actions.SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.payload,
      };

    case actions.SET_CURRENT_FILES:
      return {
        ...state,
        currentFiles: [...action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
