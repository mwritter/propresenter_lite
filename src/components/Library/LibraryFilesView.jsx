import React from "react";
import { connect } from "react-redux";
import { setCurrentLibrary } from "../../redux/library/library.actions";

const LibraryFilesView = ({ libraries, currentLibrary, setCurrentLibrary }) => {
  const getDirectories = (f) => f.filter((c) => !!c.children);
  const isCurrentLibrary = (library) => currentLibrary && library.name === currentLibrary.name

  return (
    <section className="bg-neutral-700">
      <h3 className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900 uppercase">
        Library
      </h3>
      {getDirectories(libraries).map((c) => (
        <div key={c.name} className="mb-2">
          <ul>
            {getDirectories(c.children).map((dir) => (
              <li
                key={dir.name}
                onClick={() => {
                  if (!currentLibrary || dir.name !== currentLibrary.name) setCurrentLibrary(dir)
                }}
                className={`${isCurrentLibrary(dir) ? 'bg-gray-400' : ''} px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer`}
              >
                {dir.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

const mapStateToProps = (state) => ({
  libraries: state.library.libraries,
  currentLibrary: state.library.currentLibrary
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentLibrary: (library) => dispatch(setCurrentLibrary(library)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryFilesView);
