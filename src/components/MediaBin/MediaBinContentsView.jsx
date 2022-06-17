import React, { useCallback, useState } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import { connect } from "react-redux";
import { setCurrentMediaFile } from "../../redux/media/media.actions";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { ACTIONS } from "../../context/Projector/ProjectorActions";
import { emit } from "@tauri-apps/api/event";

function MediaBinContentsView({
  currentMediaLibrary,
  currentMediaFile,
  setCurrentMediaFile,
}) {
  const isCurrentFile = useCallback(
    (f) => currentMediaFile && f.name === currentMediaFile.name,
    [currentMediaFile]
  );

  const hasVideo = (path) => {
    let result = false;
    const lib = currentMediaLibrary?.children ?? [];
    for (const f of lib) {
      if (f.path === `${path}.mp4`) {
        result = true;
        break;
      }
    }
    return result;
  };

  const handleOnClick = (f) => {
    let [path] = f.path.split(".");
    path = hasVideo(path) ? `${path}.mp4` : f.path;
    invoke("image_selected", { file: path, clear: false }).then(() => {
      setCurrentMediaFile(f);
      emit(ACTIONS.UPDATE_BACKGROUND);
    });
  };

  // TODO: ever item in here should be a lower res image/thumbnail
  return (
    <section className="bg-neutral-900 mx-2 border-t-8 border-neutral-900 rounded-t-xl scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-600 overflow-y-scroll h-[25vh]">
      <div
        // className="flex flex-wrap flex-row p-5 gap-2"
        className="grid justify-center h-min gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 175px))",
        }}
      >
        {currentMediaLibrary
          ? currentMediaLibrary.children
              .filter((file) => !file.name.includes(".mp4"))
              .map((file) => (
                <div
                  onClick={() => handleOnClick(file)}
                  key={file.name}
                  className={`${
                    isCurrentFile(file)
                      ? "border-4 border-gray-300 rounded-xl"
                      : "border-4 border-neutral-900 rounded-xl"
                  } hover:cursor-pointer overflow-hidden h-min rounded-xl"`}
                >
                  <div className="w-fill">
                    <img
                      className="rounded-lg w-fit"
                      src={convertFileSrc(file.path)}
                      alt={file.name}
                    />
                    <span className="flex gap-1 p-2">
                      <div className="">
                        <AiOutlinePlayCircle />
                      </div>
                      <p
                        title={file.name}
                        className="text-xs font-thin text-gray-500"
                      >
                        {file.name.substring(0, 15)}
                      </p>
                    </span>
                  </div>
                </div>
              ))
          : null}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  currentMediaFile: state.media.currentMediaFile,
  currentMediaLibrary: state.media.currentMediaLibrary,
  projector: state.media.projector,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentMediaFile: (file) => dispatch(setCurrentMediaFile(file)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaBinContentsView);
