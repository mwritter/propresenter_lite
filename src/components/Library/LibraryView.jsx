import React, {useState, useEffect} from "react";
import { readDir, createDir, Dir } from "@tauri-apps/api/fs";
import "./LibraryView.css";

function LibraryView() {
  //extract this into a component
  //useWithAdjuster
  const [width, setWidth] = useState("300");
  const [localData, setLocalData] = useState([]);
  const [selectedDir, setSelectedDir] = useState(null);

  //refactor this to be more readable
  useEffect(() => {
    //try to get local application data from AppData\Local\ProPresLite dir
    //or create the that dir
    const getOrCreateAppData = async () => {
      let localDir;
      try {
        localDir = await readDir("ProPresLite", {
          dir: Dir.LocalData,
          recursive: true,
        });
      } catch (e) {
        console.error(e);
        try {
          localDir = await createDir("ProPresLite", {
            dir: Dir.LocalData,
            recursive: true,
          });
        } catch (e) {
          console.error(e);
        }
      }
      setLocalData(localDir);
    };
    getOrCreateAppData();
  }, []);

  const showFiles = (fileInfo) => setSelectedDir(fileInfo);

  //Consider spliting this component into two smaller compoents
  //figure out how to resize this in Tauri for some reason 'onDrag' isn't working
  return (
    <div
      className="LibraryView text-white"
      style={{
        gridTemplateColumns: `${width}px`,
        gridTemplateRows: "1fr 1fr",
      }}
    >
      <section data-index="0">
        {localData && localData.length
          ? localData
              .filter((c) => !!c.children)
              .map((c) => (
                <div className="mb-2">
                  <p className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900">
                    {c.name.toUpperCase()}
                  </p>
                  <ul>
                    {c.children
                      .filter((child) => !!child.children)
                      .map((child) => (
                        <li
                          key={child.name}
                          onClick={() => showFiles(child)}
                          className="px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer"
                        >
                          {child.name}
                        </li>
                      ))}
                  </ul>
                </div>
              ))
          : null}
      </section>
      <section data-index="1">
        <div className="mb-2">
          <p className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900">
            ITEMS
          </p>
          <ul>
            {selectedDir && selectedDir.children
              ? selectedDir.children
                  .filter((c) => !c.children)
                  .map((c) => (
                    <li
                      key={c.name}
                      className="px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer"
                    >
                      {c.name}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      </section>
      <div
        className="side-bar-width-adjuster  hover:cursor-pointer bg-gray-900"
      ></div>
    </div>
  );
}

export default LibraryView;
