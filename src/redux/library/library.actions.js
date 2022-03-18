import * as actions from "./library.actionTypes";

export const setLibraries = (libraries) => {
  return { type: actions.SET_LIBRARIES, payload: libraries };
};

export const setCurrentLibrary = (library) => {
  return { type: actions.SET_CURRENT_LIBRARY, payload: library };
};

export const setCurrentFile = (file) => {
  return { type: actions.SET_CURRENT_FILE, payload: file };
};

export const setCurrentFiles = (files) => {
  return { type: actions.SET_CURRENT_FILES, payload: files };
};
