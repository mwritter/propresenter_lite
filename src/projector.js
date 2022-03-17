import { appWindow } from "@tauri-apps/api/window";

/**
 * TODO: this will be the logic for the Projector screen, we need to be able to invoke this event
 * when an image/mostion graphic is selected to update the dom with a fullscreen looping video of the
 */

appWindow.listen("new_graphic", ({ event, payload }) => {
  console.log("Invoked from the backend");
});
