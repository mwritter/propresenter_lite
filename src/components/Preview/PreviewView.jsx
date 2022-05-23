import { emit, listen } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/window";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  setCurrentMediaFile,
  setCurrentTime,
  setCurrentMediaText,
  setProjector,
} from "../../redux/media/media.actions";
import { ACTIONS } from "../../context/Projector/ProjectorActions";
import { invoke } from "@tauri-apps/api";
import PreviewVideo from "./PreviewVideo";

const PreviewView = ({
  setCurrentMediaFile,
  setCurrentTime,
  setCurrentMediaText,
  setProjector,
}) => {
  useEffect(() => {
    listen("projector_video_timeupdate", (ev) => {
      const time = JSON.parse(ev.payload)?.time;
      setCurrentTime(time);
    });
    // init projector webview
    const webview = new WebviewWindow("projector", {
      url: "/projector.html",
      // fullscreen: true,
    });
    webview.once("tauri://created", () => {
      setProjector(webview);
    });
  }, []);

  // TODO: this needs to be generic and use some kind of 'settings.json' also might put into its own component
  const onClearToLogo = async () => {
    const path = await invoke("clear_to_logo");
    setCurrentMediaFile({
      name: "clear_to_logo",
      path,
    });
    setCurrentMediaText("");
    emit(ACTIONS.UPDATE_BACKGROUND, "clear");
  };

  return (
    <section
      className="bg-neutral-700 grid items-start max-w-[400px]"
      style={{ gridArea: "Preview", gridRowStart: "3", gridRowEnd: "-1" }}
    >
      <div className="p-4 grid">
        <PreviewVideo />
        <div className="w-full mx-auto mt-1">
          <div className="grid">
            <button
              onClick={onClearToLogo}
              className="mt-1 text-sm bg-opacity-60 bg-zinc-500 hover:cursor-pointer hover:bg-zinc-400 p-2 rounded-md"
            >
              Clear to logo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentTime: state.media.currentTime,
  currentMediaFile: state.media.currentMediaFile,
  currentMediaText: state.media.currentMediaText,
  currentMediaLibrary: state.media.currentMediaLibrary,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTime: (time) => dispatch(setCurrentTime(time)),
  setProjector: (view) => dispatch(setProjector(view)),
  setCurrentMediaFile: (file) => dispatch(setCurrentMediaFile(file)),
  setCurrentMediaText: (text) => dispatch(setCurrentMediaText(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewView);
