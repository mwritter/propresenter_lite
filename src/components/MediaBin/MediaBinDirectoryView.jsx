import React from "react";
import { connect } from "react-redux";
import { setCurrentMediaLibrary } from "../../redux/media/media.actions";

function MediaBinDirectoryView({
  library,
  currentMediaLibrary,
  setCurrentMediaLibrary,
}) {
  const getDirectories = (f) => f.filter((c) => !!c.children);
  const isCurrentLibrary = (library) =>
    currentMediaLibrary && library.name === currentMediaLibrary.name;
  return (
    <section className="bg-neutral-700">
      <h3 className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900 uppercase">
        Media
      </h3>
      {getDirectories(library).map((c) => (
        <div key={c.name} className="mb-2">
          <ul>
            {getDirectories(c.children).map((dir) => (
              <li
                key={dir.name}
                onClick={() => {
                  if (!isCurrentLibrary(dir)) setCurrentMediaLibrary(dir);
                }}
                className={`${
                  isCurrentLibrary(dir) ? "bg-gray-400" : ""
                } px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer`}
              >
                {dir.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

const mapStateToProps = (state) => ({
  currentMediaLibrary: state.media.currentMediaLibrary,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentMediaLibrary: (library) =>
    dispatch(setCurrentMediaLibrary(library)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaBinDirectoryView);
