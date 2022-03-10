import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setLibraries } from "../../redux/library/library.actions";
import { readDir, createDir, Dir } from "@tauri-apps/api/fs";
import LibraryFilesView from "./LibraryFilesView";
import LibraryContentsView from "./LibraryContentsView";

function LibraryView({ setLibraries }) {
  //extract this into a component
  //useWithAdjuster
  const [width, setWidth] = useState("300");

  useEffect(() => {
    readDir("ProPresLite", {
      dir: Dir.LocalData,
      recursive: true,
    })
      .then((res) => setLibraries(res))
      .catch((err) => {
        console.error(err);
        createDir("ProPresLite", {
          dir: Dir.LocalData,
          recursive: true,
        })
          .then((res) => setLibraries(res))
          .catch((err) => console.error(err));
      });
  }, []);

  //figure out how to resize this in Tauri for some reason 'onDrag' isn't working
  return (
    <div
      className="LibraryView text-white grid"
      style={{
        gridTemplateColumns: `${width}px`,
        gridTemplateRows: "1fr 1fr",
      }}
    >
      <LibraryFilesView />
      <LibraryContentsView />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLibraries: (libraries) => dispatch(setLibraries(libraries)),
});

export default connect(null, mapDispatchToProps)(LibraryView);
