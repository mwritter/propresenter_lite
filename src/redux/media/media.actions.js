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

export const setCurrentTime = (time) => {
  return { type: actions.SET_CURRENT_TIME, payload: time };
};

export const setCurrentMediaText = (text) => {
  return { type: actions.SET_CURRENT_MEDIA_TEXT, payload: text };
};

export const setProjector = (projector) => {
  return { type: actions.SET_PROJECTOR, payload: projector };
};
