import React, { useState } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import { connect } from "react-redux";
import { setCurrentMediaFile } from "../../redux/media/media.actions";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useProjector, ACTIONS } from "../../context/ProjectorContext";

function MediaBinContentsView({
  currentMediaLibrary,
  currentMediaFile,
  setCurrentMediaFile,
}) {
  const { projectorDispatch } = useProjector();
  const [currentMotionGraphic, setCurrentMotionGraphic] = useState(null);
  const isCurrentFile = (f) =>
    currentMediaFile && f.name === currentMediaFile.name;
  const handleOnClick = (f) => {
    setCurrentMediaFile(f);
  };

  const imageClickedFix = () => {
    if (currentMotionGraphic) {
      currentMotionGraphic.pause();
      setCurrentMotionGraphic(null);
    }
  };

  // TODO: this needs to be in a Preview component not in the Media Bin
  const imageClicked = (file) => {
    // this will be used to tell the Projector monitor to show an image
    // invoke("image_selected");
    projectorDispatch({ type: ACTIONS.UPDATE_BACKGROUND, payload: file.path });
    setCurrentMotionGraphic(file);
  };

  // TODO: ever item in here should be a lower res image/thumbnail
  return (
    <section
      className="bg-neutral-900 mx-2 border-t-8 border-neutral-900 grid grid-cols-3 lg:grid-cols-8 2xl:grid-cols-10 p-5 gap-2 min-w-[500px] rounded-t-xl overflow-scroll"
      style={{ gridTemplateRows: "min-content" }}
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
                <div onClick={() => imageClicked(file)}>
                  <img
                    className="rounded-lg"
                    src={convertFileSrc(file.path)}
                    alt={file.name}
                  />
                </div>
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
            ))
        : null}
    </section>
  );
}

const mapStateToProps = (state) => ({
  currentMediaFile: state.media.currentMediaFile,
  currentMediaLibrary: state.media.currentMediaLibrary,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentMediaFile: (file) => dispatch(setCurrentMediaFile(file)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaBinContentsView);
