import * as actions from "./media.actionTypes";

export const setMediaLibraries = (libraries) => {
  return { type: actions.SET_MEDIA_LIBRARIES, payload: libraries };
};

export const setCurrentMediaLibrary = (library) => {
  return { type: actions.SET_CURRENT_MEDIA_LIBRARY, payload: library };
};

export const setCurrentMediaFile = (file) => {
  return { type: actions.SET_CURRENT_MEDIA_FILE, payload: file };
};
