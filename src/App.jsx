import React from "react";
import LibraryView from "./components/Library/LibraryView";
import MediaBinView from "./components/MediaBin/MediaBinView";
import ShowView from "./components/Show/ShowView";
import ToolBarView from "./components/ToolBar/ToolBarView";
import PreviewView from "./components/Preview/PreviewView";
import "./App.css";

function App() {
  return (
    <div className="App h-screen text-white">
      <ToolBarView />
      <ShowView />
      <LibraryView />
      <MediaBinView />
      <PreviewView />
    </div>
  );
}

export default App;
