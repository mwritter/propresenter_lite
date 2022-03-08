import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { readDir } from '@tauri-apps/api/fs'
import "./LibraryView.css";

function LibraryView() {
  //extract this into a component
  //useWithAdjuster
  const [width, setWidth] = useState("300");

  useEffect(() => {
    console.log(readDir('.'))
  }, [])

  const handleDrag = (e) => {
    const getDir = readDir('../assets').then((res) => {
      console.log(res)
    })
    const pos = e.clientX;
    if (pos >= 200 && pos <= 500) {
      setWidth(e.clientX);
    } else {
      console.log("issue");
    }
  };

  //Consider spliting this component into two smaller compoents
  return (
    <div
      className="LibraryView text-white"
      style={{
        gridTemplateColumns: `${width}px 1rem`,
      }}
    >
      <section data-index="0">
        <div className="mb-2">
          <p className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900">
            LIBRARY
          </p>
          <ul>
            <li className="px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer">
              Default
            </li>
          </ul>
        </div>
        <div className="mb-2">
          <p className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900">
            PLAYLIST
          </p>
          <ul>
            <li className="px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer">
              Playlist
            </li>
          </ul>
        </div>
      </section>
      <section data-index="1">
        <div className="mb-2">
          <p className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900">
            ITEMS
          </p>
          <ul>
            <li className="px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer">
              Call Upon The Lord
            </li>
            <li className="px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer">
              Way Maker
            </li>
          </ul>
        </div>
      </section>
      <div
        onDrag={handleDrag}
        className="side-bar-width-adjuster  hover:cursor-pointer bg-gray-900"
      ></div>
    </div>
  );
}

export default LibraryView;
