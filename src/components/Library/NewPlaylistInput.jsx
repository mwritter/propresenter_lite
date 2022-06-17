import React, { useCallback, useRef } from "react";
import useFile from "../../hooks/tauri/useFile";

const NewPlaylistInput = ({ toggleAddPlaylist }) => {
  const inputRef = useRef();
  const createFile = useFile();

  const keyPress = useCallback(
    (evt) => {
      const { value } = inputRef?.current || {};
      if (evt.key === "Enter" && value?.length) {
        createFile({
          contents: JSON.stringify({}),
          path: `ProPresLite\\Playlists\\${value}.json`,
        }).then(() => {
          toggleAddPlaylist();
        });
      } else if (evt.key === "Escape") {
        // remove input
        toggleAddPlaylist();
      }
    },
    [inputRef.current?.value]
  );

  return (
    <input
      autoFocus
      autocomplete="off"
      ref={inputRef}
      onKeyDown={keyPress}
      id="new_playlist_input"
      type="text"
      className="bg-gray-400 w-[100%] px-2 py-1 text-xs text-black"
    ></input>
  );
};

export default NewPlaylistInput;
