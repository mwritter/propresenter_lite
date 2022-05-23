import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { setLibraries } from "../../redux/library/library.actions";
import { readDir, createDir, Dir } from "@tauri-apps/api/fs";
import LibraryFilesView from "./LibraryFilesView";
import LibraryContentsView from "./LibraryContentsView";
import useDirectory from "../../hooks/tauri/useDirectory";

function LibraryView({ setLibraries }) {
  // TODO: this should probably be put somewhere else, we need this file and a few others
  // might be better to do this in rust but idk

  // would be nice to do something like this:
  // cosnt baseDir = useDirectory("ProPresLite", Dir.LocalData)
  // baseDir.getDirectory(DIRECTORY.LIBRARY)

  const getMainDirectory = useCallback(async () => {
    const data = await useDirectory("ProPresLite");
    setLibraries(data);
  }, [useDirectory, setLibraries]);

  useEffect(() => {
    getMainDirectory();
    // const data = useDirectory('ProPresLite')
    // readDir("ProPresLite", {
    //   dir: Dir.LocalData,
    //   recursive: true,
    // })
    //   .then((res) => setLibraries(res))
    //   .catch((err) => {
    //     console.error(err);
    //     createDir("ProPresLite", {
    //       dir: Dir.LocalData,
    //       recursive: true,
    //     })
    //       .then((res) => setLibraries(res))
    //       .catch((err) => console.error(err));
    //   });
  }, []);

  return (
    <section style={{ gridArea: "Library" }} className="grid h-full">
      <LibraryFilesView />
      <LibraryContentsView />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLibraries: (libraries) => dispatch(setLibraries(libraries)),
});

export default connect(null, mapDispatchToProps)(LibraryView);
