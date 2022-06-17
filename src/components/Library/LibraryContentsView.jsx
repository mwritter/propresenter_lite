import { readTextFile } from "@tauri-apps/api/fs";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCurrentFiles } from "../../redux/library/library.actions";

// TODO: this needs to be more generic to use both Library and Playlist
// TODO: refactor this
// might be better to do all the state and file reads / writes in Rust ¯\_(ツ)_/¯

function LibraryContentsView({
  currentFiles,
  setCurrentFiles,
  currentPlaylist,
}) {
  const [contents, setContents] = useState(null);
  const getSectionData = useCallback(() => {
    const { sections } = contents;
    const titledSections = sections.filter((s) => !!s.title);
    return titledSections;
  });
  const getData = useCallback(async () => {
    // read in the file and JSON parse it
    const files = [];
    const data = await readTextFile(currentPlaylist.path);
    const dataObj = JSON.parse(data);
    const { sections } = dataObj;
    setContents(dataObj);
    // read in all the files
    for (const section of sections) {
      // can use Promise.all here to kick off all the reads at once
      // and map them back with the id
      if (section.data) {
        for (const file of section.data) {
          const fileData = await readTextFile(file.path);
          file.data = JSON.parse(fileData);
          files.push(file);
        }
      }
    }
    setCurrentFiles(files);
  }, [currentPlaylist, setContents]);

  useEffect(() => {}, [contents]);

  useEffect(() => {
    if (currentPlaylist) {
      getData();
    }
  }, [getData, currentPlaylist]);

  return (
    <section className="bg-neutral-800 w-[300px]">
      <div className="mb-2 justify-center">
        <p className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900">
          ITEMS
        </p>
        <ul className="list-none grid">
          {currentPlaylist && (
            <div>
              {contents?.sections &&
                getSectionData().map((s) => {
                  return (
                    <div className="p-2" key={s.id}>
                      <p className="cursor-pointer p-1 rounded-sm font-bold bg-slate-700 min-w-full">
                        {s.title}
                      </p>
                      <ul>
                        {currentFiles &&
                          currentFiles.map((file) => (
                            <li key={file.id}>
                              <span></span>
                              <span className="cursor-pointer text-sm px-3">
                                {file.data.title}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          )}
        </ul>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  currentPlaylist: state.library.currentPlaylist,
  currentFiles: state.library.currentFiles,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFiles: (files) => dispatch(setCurrentFiles(files)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryContentsView);
