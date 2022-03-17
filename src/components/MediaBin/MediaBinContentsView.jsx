import React, { useState } from "react";
import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import { connect } from "react-redux";
import { setCurrentMediaFile } from "../../redux/media/media.actions";
import { AiOutlinePlayCircle } from "react-icons/ai";

function MediaBinContentsView({
  currentMediaLibrary,
  currentMediaFile,
  setCurrentMediaFile,
}) {
  const [currentMotionGraphic, setCurrentMotionGraphic] = useState(null);
  const isCurrentFile = (f) =>
    currentMediaFile && f.name === currentMediaFile.name;
  const handleOnClick = (f) => {
    setCurrentMediaFile(f);
  };

  const imageClicked = () => {
    if (currentMotionGraphic) {
      currentMotionGraphic.pause();
      setCurrentMotionGraphic(null);
    }
  };

  // TODO: this needs to be in a Preview component not in the Media Bin
  const motionGraphicClicked = (e) => {
    const video = e.target;
    if (currentMotionGraphic && video.id == currentMotionGraphic.id) {
      video.paused ? video.play() : video.pause();
    } else if (currentMotionGraphic) {
      currentMotionGraphic.pause();
      setCurrentMotionGraphic(video);
      video.play();
    } else {
      setCurrentMotionGraphic(video);
      video.play();
    }
    // this will be used to tell the Projector monitor to show an image
    invoke("image_selected");
  };

  // TODO: ever item in here should be a lower res image/thumbnail
  return (
    <section
      className="bg-neutral-900 mx-2 grid sm:grid-cols-3 lg:grid-cols-8 2xl:grid-cols-10 p-5 gap-2"
      style={{ gridTemplateRows: "min-content" }}
    >
      {currentMediaLibrary
        ? currentMediaLibrary.children.map((file) => (
            <div
              onClick={() => handleOnClick(file)}
              key={file.name}
              className={`${
                isCurrentFile(file)
                  ? "border-4 border-gray-300"
                  : "border-4 border-neutral-900"
              } hover:cursor-pointer overflow-hidden h-min`}
            >
              {!file.name.includes(".mp4") ? (
                <div onClick={imageClicked}>
                  <img src={convertFileSrc(file.path)} alt={file.name} />
                </div>
              ) : (
                <div>
                  {/* TODO: this should be a thumbnail not a video - the video playback will be in a Preview component */}
                  <video
                    loop
                    data-path={file.path}
                    controls={false}
                    id={file.name}
                    onClick={(e) => motionGraphicClicked(e)}
                  >
                    <source
                      src={convertFileSrc(file.path)}
                      type="video/mp4"
                    ></source>
                  </video>
                </div>
              )}
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
