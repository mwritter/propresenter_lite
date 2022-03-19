import { createContext, useContext, useEffect, useReducer } from "react";
import { WebviewWindow } from "@tauri-apps/api/window";

// initial state
const INITIAL_STATE = {
  background: null,
  text: "",
  projector: null,
};

export const ACTIONS = {
  UPDATE_BACKGROUND: "UPDATE_BACKGROUND",
  UPDATE_TEXT: "UPDATE_TEXT",
  SET_PROJECTOR: "SET_PROJECTOR",
};

// state context
const ProjectorStateContext = createContext(INITIAL_STATE);
// dispatch context
const ProjectorDispatchContext = createContext(() => {
  throw new Error("Not within ProjectorContext");
});

// reducer - probably shouldn't be emitting changes in the reducer
// but I think this is a good way to do this
const projectorReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_BACKGROUND: {
      if (state.projector) {
        state.projector.emit(ACTIONS.UPDATE_BACKGROUND, action.payload);
      }
      return { ...state, background: action.payload };
    }
    case ACTIONS.UPDATE_TEXT: {
      if (state.projector) {
        state.projector.emit(ACTIONS.UPDATE_TEXT, action.payload);
      }
      return { ...state, text: action.payload };
    }
    // this really should only be called once when the application loads
    case ACTIONS.SET_PROJECTOR: {
      return { ...state, projector: action.payload };
    }

    default: {
      throw new Error("Action not supported");
    }
  }
};

// provider
export const ProjectorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectorReducer, INITIAL_STATE);

  useEffect(() => {
    // init projector webview once we load the provider
    const webview = new WebviewWindow("projector", {
      url: "projector.html",
      fullscreen: true,
    });
    webview.once("tauri://created", () => {
      dispatch({ type: ACTIONS.SET_PROJECTOR, payload: webview });
    });
  }, []);

  return (
    <ProjectorDispatchContext.Provider value={dispatch}>
      {children}
    </ProjectorDispatchContext.Provider>
  );
};

export const useProjectorStateContext = () => useContext(ProjectorStateContext);
export const useProjectorDispatchContext = () =>
  useContext(ProjectorDispatchContext);

export const useProjector = () => {
  return {
    projectorState: useProjectorStateContext(),
    projectorDispatch: useProjectorDispatchContext(),
  };
};
