import React from "react";

//two componets one for the files and the other for the previews
const MediaBinView = ({ contents = [] }) => {
  const getDirectories = (f) => f.filter((c) => !!c.children);
  const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <section className="bg-neutral-700">
        <h3 className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900 uppercase">
          Media
        </h3>
        {getDirectories(contents).map((c) => (
          <div key={c.name} className="mb-2">
            <ul>
              {getDirectories(c.children).map((dir) => (
                <li
                  key={dir.name}
                  onClick={() => setSelectedDir(dir)}
                  className="px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer"
                >
                  {dir.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="bg-neutral-700 mx-2 grid grid-cols-5 overflow-scroll p-5">
        {dummyData.map((d) => (
          <div className="bg-slate-400 m-2 h-auto w-auto" key={d}></div>
        ))}
      </section>
    </>
  );
};

export default MediaBinView;
