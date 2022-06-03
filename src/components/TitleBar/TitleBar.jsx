import React, { useCallback } from "react";
import { appWindow } from "@tauri-apps/api/window";
import {
  VscChromeMaximize,
  VscChromeClose,
  VscChromeMinimize,
} from "react-icons/vsc";

const TitleBar = () => {
  const close = useCallback(() => {
    appWindow.close();
    // need to trigger close all windows
  }, []);

  const minimize = useCallback(() => {
    appWindow.minimize();
  }, []);

  const toggleMaximize = useCallback(() => {
    appWindow.toggleMaximize();
  }, []);

  return (
    <div
      style={{ gridArea: "TitleBar" }}
      className="h-8 text-md flex justify-end items-center bg-neutral-700"
      data-tauri-drag-region
    >
      <div className="flex space-x-5 pr-2">
        <div
          className="titlebar-button hover:cursor-pointer"
          id="titlebar-minimize"
          onClick={minimize}
        >
          <VscChromeMinimize />
        </div>
        <div
          className="titlebar-button hover:cursor-pointer"
          id="titlebar-maximize"
          onClick={toggleMaximize}
        >
          <VscChromeMaximize />
        </div>
        <div
          className="titlebar-button hover:cursor-pointer"
          id="titlebar-close"
          onClick={close}
        >
          <VscChromeClose />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
