import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import useDirectory from "../../hooks/tauri/useDirectory";
import {
  setCurrentFiles,
  setCurrentLibrary,
} from "../../redux/library/library.actions";

const LibraryFilesView = ({
  libraries,
  currentLibrary,
  currentFiles,
  setCurrentLibrary,
  setCurrentFiles,
}) => {
  const [libraryDir, setLibraryDir] = useState([]);
  const [playlistDir, setPlaylistDir] = useState([]);
  // we need these directories so we should get or create them
  const getDirectories = useCallback((f) => f.filter((c) => !!c.children), []);
  const isCurrentLibrary = useCallback(
    (library) => currentLibrary && library.name === currentLibrary.name,
    [currentLibrary]
  );

  const selectPlaylist = useCallback(
    (dir) => {
      setCurrentLibrary(dir);
      if (currentFiles.dir?.path !== dir.path) {
        setCurrentFiles({ dir, files: dir.children });
      }
    },
    [setCurrentFiles, setCurrentLibrary, currentFiles]
  );

  useEffect(() => {
    // get the Library Directory
    const getLibraryDir = async () => {
      const dir = await useDirectory("ProPresLite\\Library");
      setLibraryDir(dir);
    };

    // get the PlaylistDir
    const getPlaylistDir = async () => {
      const dir = await useDirectory("ProPresLite\\Playlists");
      setPlaylistDir(dir);
    };

    getLibraryDir();
    getPlaylistDir();
  }, [useDirectory]);

  // this can probably be consolidated
  return (
    <section className="bg-neutral-700 overflow-hidden w-[300px]">
      <h3 className="section-header-top text-xs  border-t-2 border-b-2 border-gray-900 uppercase">
        <div className="flex justify-between items-center px-2">
          <span className="font-bold">Library</span>
          <span className="text-lg hover:cursor-pointer">+</span>
        </div>
      </h3>
      {getDirectories(libraryDir).map((c) => (
        <div key={c.name} className="mb-2">
          <ul>
            {getDirectories(c.children).map((dir) => (
              <li
                key={dir.name}
                onClick={() => {
                  if (!isCurrentLibrary(dir)) setCurrentLibrary(dir);
                }}
                className={`${
                  isCurrentLibrary(dir) ? "bg-gray-400" : ""
                } px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer`}
              >
                {dir.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h3 className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900 uppercase">
        Playlist
      </h3>
      {getDirectories(playlistDir).map((c) => (
        <div key={c.name} className="mb-2">
          <ul>
            {getDirectories(c.children).map((dir) => (
              <li
                key={dir.name}
                onClick={() => {
                  if (!isCurrentLibrary(dir)) selectPlaylist(dir);
                }}
                className={`${
                  isCurrentLibrary(dir) ? "bg-gray-400" : ""
                } px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer`}
              >
                {dir.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

const mapStateToProps = (state) => ({
  libraries: state.library.libraries,
  currentLibrary: state.library.currentLibrary,
  currentFiles: state.library.currentFiles,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentLibrary: (library) => dispatch(setCurrentLibrary(library)),
  setCurrentFiles: (files) => dispatch(setCurrentFiles(files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryFilesView);
