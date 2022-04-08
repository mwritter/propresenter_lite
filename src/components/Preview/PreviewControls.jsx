import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import controls from "./preview_controls";
import {
  MdSkipNext,
  MdPause,
  MdSkipPrevious,
  MdPlayArrow,
} from "react-icons/md";
import { emit } from "@tauri-apps/api/event";
import { ACTIONS } from "../../context/Projector/ProjectorActions";

const PreviewControls = ({ currentTime, duration = 0, isPlaying }) => {
  const seekBarRef = useRef();

  useEffect(() => {
    if (seekBarRef.current) {
      seekBarRef.current.value = controls.getCurrentMediaTime(
        currentTime,
        duration
      );
    }
  }, [currentTime]);

  return (
    <>
      {duration > 0 ? (
        <div>
          <div className="flex justify-between h-5">
            <span>
              {!!currentTime ? controls.getTime(currentTime) : "0:00"}
            </span>
            <span>{!!duration ? controls.getTime(duration) : "0:00"}</span>
          </div>
          <input
            ref={seekBarRef}
            className="w-full"
            type="range"
            min={0}
            max={100}
            onChange={(e) => {
              const percent = e.target.value;
              const value = (percent * duration) / 100;
              emit(ACTIONS.SEEK, { time: value });
            }}
          />
          <div className="flex space-x-5 text-2xl justify-center">
            <MdSkipPrevious
              className="hover:cursor-pointer"
              onClick={() => {
                emit(ACTIONS.SKIP_BACKWARDS);
              }}
            />
            {isPlaying ? (
              <MdPause
                className="hover:cursor-pointer"
                onClick={() => {
                  emit(ACTIONS.TOGGLE_PLAY_PAUSE);
                }}
              />
            ) : (
              <MdPlayArrow
                className="hover:cursor-pointer"
                onClick={() => {
                  emit(ACTIONS.TOGGLE_PLAY_PAUSE);
                }}
              />
            )}
            <MdSkipNext
              className="hover:cursor-pointer"
              onClick={async () => {
                emit(ACTIONS.SKIP_FORWARD);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentTime: state.media.currentTime,
});

export default connect(mapStateToProps)(PreviewControls);
