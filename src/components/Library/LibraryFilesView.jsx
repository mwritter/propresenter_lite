import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import useDirectory from "../../hooks/tauri/useDirectory";
import {
  setCurrentFiles,
  setCurrentLibrary,
  setCurrentPlaylist,
} from "../../redux/library/library.actions";
import NewPlaylistInput from "./NewPlaylistInput";

const LibraryFilesView = ({
  currentLibrary,
  currentPlaylist,
  currentFiles,
  setCurrentLibrary,
  setCurrentPlaylist,
  setCurrentFiles,
}) => {
  const [libraryDir, setLibraryDir] = useState([]);
  const [playlistDir, setPlaylistDir] = useState([]);
  const [addPlaylist, setAddPlaylist] = useState(false);

  const getFiles = (dir) => {
    return dir.filter((d) => !d?.children);
  };
  const isCurrentLibrary = useCallback(
    (library) => currentLibrary && library.name === currentLibrary.name,
    [currentLibrary]
  );

  const isCurrentPlaylist = useCallback(
    (playlist) => currentPlaylist && playlist.name === currentPlaylist.name,
    [currentPlaylist]
  );

  const selectPlaylist = useCallback(
    (playlist) => {
      if (!isCurrentPlaylist(playlist)) {
        setCurrentPlaylist(playlist);
      }
    },
    [setCurrentPlaylist]
  );

  const toggleAddPlaylist = useCallback(() => {
    setAddPlaylist((current) => !current);
  });

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
        <div className="flex justify-between items-center">
          <span className="font-bold px-2">Library</span>
          <span
            className="text-lg hover:cursor-pointer px-2"
            onClick={() => {
              // TODO: create a new entry in the library section once typed and entered create an empty folder in the library dir
            }}
          >
            +
          </span>
        </div>
      </h3>
      <div className="mb-2">
        <ul>
          {getFiles(libraryDir).map((c) => (
            <li
              key={c.name}
              onClick={() => {
                if (!isCurrentLibrary(c)) setCurrentLibrary(c);
              }}
              className={`${
                isCurrentLibrary(c) ? "bg-gray-400" : ""
              } px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer`}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
      <h3 className="section-header-top text-xs  border-t-2 border-b-2 border-gray-900 uppercase">
        <div className="flex justify-between items-center">
          <span className="font-bold px-2">Playlist</span>
          <button
            className="text-lg hover:cursor-pointer px-2"
            onClick={() => {
              // TODO: create a new entry in the Playlist section once typed and entered create an empty folder in the playlist dir
              // may wanna use a ref here instead of state
              toggleAddPlaylist();
            }}
          >
            +
          </button>
        </div>
      </h3>
      <div className="mb-2">
        <ul>
          {addPlaylist ? (
            <NewPlaylistInput toggleAddPlaylist={toggleAddPlaylist} />
          ) : null}
          {getFiles(playlistDir).map((c) => (
            <li
              key={c.name}
              onClick={() => {
                if (!isCurrentPlaylist(c)) selectPlaylist(c);
              }}
              className={`${
                isCurrentPlaylist(c) ? "bg-gray-400" : ""
              } px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer`}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentLibrary: state.library.currentLibrary,
  currentPlaylist: state.library.currentPlaylist,
  currentFiles: state.library.currentFiles,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentLibrary: (library) => dispatch(setCurrentLibrary(library)),
  setCurrentPlaylist: (playlist) => dispatch(setCurrentPlaylist(playlist)),
  setCurrentFiles: (files) => dispatch(setCurrentFiles(files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryFilesView);
