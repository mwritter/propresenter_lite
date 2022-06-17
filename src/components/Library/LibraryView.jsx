import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { setLibraries } from "../../redux/library/library.actions";
import { readDir, createDir, Dir } from "@tauri-apps/api/fs";
import LibraryFilesView from "./LibraryFilesView";
import LibraryContentsView from "./LibraryContentsView";
import useDirectory from "../../hooks/tauri/useDirectory";

function LibraryView({ setLibraries }) {
  const getMainDirectory = useCallback(async () => {
    const data = await useDirectory("ProPresLite");
    setLibraries(data);
  }, [useDirectory, setLibraries]);

  useEffect(() => {
    getMainDirectory();
  }, [getMainDirectory]);

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
