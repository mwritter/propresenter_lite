import { emit, listen } from "@tauri-apps/api/event";
import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import { ACTIONS } from "/src/context/Projector/ProjectorActions.js";

const video = document.getElementById("video");
const text = document.getElementById("text");
const img = document.getElementById("img");

video.addEventListener("timeupdate", () => {
  emit("projector_video_timeupdate", { time: video.currentTime });
});

listen(ACTIONS.UPDATE_BACKGROUND, (ev) => {
  invoke("get_image_selected").then((res) => {
    const [path, ext] = res.split(".");
    if (ext === "mp4") {
      video.src = convertFileSrc(res);
      video.load();
      img.src = "";
    } else {
      img.src = convertFileSrc(res);
      video.src = "";
    }

    if (ev.payload === "clear") {
      emit(ACTIONS.UPDATE_TEXT);
    }
  });
});

listen(ACTIONS.UPDATE_TEXT, (ev) => {
  invoke("get_text_selected").then((res) => {
    text.textContent = res;
  });
});

listen(ACTIONS.SEEK, (ev) => {
  const time = JSON.parse(ev.payload)?.time;
  video.currentTime = time;
  emit("projector_action_complete", ACTIONS.SEEK);
});

listen(ACTIONS.TOGGLE_PLAY_PAUSE, () => {
  if (video.paused) {
    video.play();
    emit("projector_action_complete", ACTIONS.PLAY);
  } else {
    video.pause();
    emit("projector_action_complete", ACTIONS.PAUSE);
  }
});

listen(ACTIONS.SKIP_FORWARD, (ev) => {
  const { currentTime, duration } = video;
  const forward = currentTime + 10;
  video.currentTime = forward > duration ? duration : forward;
  emit("projector_action_complete", ACTIONS.SKIP_FORWARD);
});

listen(ACTIONS.SKIP_BACKWARDS, (ev) => {
  const { currentTime } = video;
  const backwards = currentTime - 10;
  video.currentTime = backwards < 0 ? 0 : backwards;
  emit("projector_action_complete", ACTIONS.SKIP_BACKWARDS);
});

// might be able better to utilize seperate action for clear to logo
listen(ACTIONS.CLEAR_TO_LOGO, (ev) => {
  invoke("get_logo").then((res) => {
    const logo_path = convertFileSrc(res);
    video.src = "";
    img.src = logo_path;
  });
});
