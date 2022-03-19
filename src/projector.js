import { appWindow } from "@tauri-apps/api/window";
import { emit, listen } from "@tauri-apps/api/event";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { ACTIONS } from "./context/ProjectorContext";

const unlisten_new_graphic = listen(ACTIONS.UPDATE_BACKGROUND, (ev) => {
  const video = document.getElementById("video");
  const source = document.getElementById("source");
  const src = ev.payload.replace(".jpg", ".mp4");
  source.src = convertFileSrc(src);
  video.load();
});

const unlisten_new_text = listen(ACTIONS.UPDATE_TEXT, (ev) => {
  const text = document.getElementById("text");
  const value = ev.payload;
  text.textContent = value;
});
