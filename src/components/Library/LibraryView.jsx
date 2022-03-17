import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setLibraries } from "../../redux/library/library.actions";
import { readDir, createDir, Dir } from "@tauri-apps/api/fs";
import LibraryFilesView from "./LibraryFilesView";
import LibraryContentsView from "./LibraryContentsView";

function LibraryView({ setLibraries }) {
  // TODO: this should probably be put somewhere else, we need this file and a few others
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

  return (
    <section className="grid h-full">
      <LibraryFilesView />
      <LibraryContentsView />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLibraries: (libraries) => dispatch(setLibraries(libraries)),
});

export default connect(null, mapDispatchToProps)(LibraryView);
