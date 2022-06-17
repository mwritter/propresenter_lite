import * as actions from "./library.actionTypes";

export const setLibraries = (libraries) => {
  return { type: actions.SET_LIBRARIES, payload: libraries };
};

export const setCurrentLibrary = (library) => {
  return { type: actions.SET_CURRENT_LIBRARY, payload: library };
};

export const setCurrentPlaylist = (playlist) => {
  return { type: actions.SET_CURRENT_PLAYLIST, payload: playlist };
};

export const setCurrentFile = (file) => {
  return { type: actions.SET_CURRENT_FILE, payload: file };
};

export const setCurrentFiles = (files) => {
  return { type: actions.SET_CURRENT_FILES, payload: files };
};
