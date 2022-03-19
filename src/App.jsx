import React from "react";
import LibraryView from "./components/Library/LibraryView";
import MediaBinView from "./components/MediaBin/MediaBinView";
import "./App.css";
import ShowView from "./components/Show/ShowView";
import ToolBarView from "./components/ToolBar/ToolBarView";
import { ProjectorProvider } from "./context/ProjectorContext";

function App() {
  return (
    <ProjectorProvider>
      <div className="App h-screen text-white">
        <ToolBarView />
        <ShowView />
        <LibraryView />
        <MediaBinView />
      </div>
    </ProjectorProvider>
  );
}

export default App;
