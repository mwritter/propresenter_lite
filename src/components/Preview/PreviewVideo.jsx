import { listen } from "@tauri-apps/api/event";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PreviewControls from "./PreviewControls";
import controls from "./preview_controls";
import { ACTIONS } from "../../context/Projector/ProjectorActions";

const PreviewVideo = ({
  currentMediaLibrary,
  currentMediaFile,
  currentMediaText,
  currentTime,
}) => {
  const videoRef = useRef();
  const imgRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    listen("projector_action_complete", function (ev) {
      projectorActionComplete(ev);
    });
  }, []);

  useEffect(() => {
    //not a fan of this but skipping forward and backwords sometime needs some corrections
    const diff = currentTime - videoRef.current.currentTime;
    if (Math.abs(diff) > 1) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (currentMediaFile) {
      const [path, ext] = currentMediaFile.path.split(".");
      if (controls.hasVideo(path, currentMediaLibrary?.children)) {
        videoRef.current.src = controls.getMotionGraphic(path);
        videoRef.current.load();
        setIsPlaying(true);
        imgRef.current.src = "";
      } else {
        videoRef.current.src = "";
        imgRef.current.src = convertFileSrc(currentMediaFile.path);
      }
    }
  }, [currentMediaFile]);

  const projectorActionComplete = (ev) => {
    switch (ev.payload) {
      case ACTIONS.PLAY: {
        videoRef.current.play();
        setIsPlaying(true);
        break;
      }
      case ACTIONS.PAUSE: {
        videoRef.current.pause();
        setIsPlaying(false);
        break;
      }
    }
  };

  return (
    <div>
      <div className="grid place-items-center text-center bg-black">
        <video
          style={{ gridColumn: 1 / 1, gridRow: 1 / 1 }}
          ref={videoRef}
          width={400}
          loop
          autoPlay
        >
          {currentMediaFile ? <source type="video/mp4" /> : null}
        </video>
        <span className="z-10" style={{ gridColumn: 1 / 1, gridRow: 1 / 1 }}>
          {currentMediaText}
        </span>
        <img
          ref={imgRef}
          src=""
          alt=""
          style={{ gridColumn: 1 / 1, gridRow: 1 / 1 }}
        />
      </div>
      <PreviewControls
        duration={videoRef.current?.duration}
        isPlaying={isPlaying}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentTime: state.media.currentTime,
  currentMediaFile: state.media.currentMediaFile,
  currentMediaText: state.media.currentMediaText,
  currentMediaLibrary: state.media.currentMediaLibrary,
});

export default connect(mapStateToProps)(PreviewVideo);
