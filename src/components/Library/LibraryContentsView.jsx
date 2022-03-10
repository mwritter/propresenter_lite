import React from "react";
import { connect } from "react-redux";
import { setCurrentFile } from "../../redux/library/library.actions";

function LibraryContentsView({ library, currentFile, setCurrentFile }) {
  const isCurrentFile = (f) => currentFile && f.name === currentFile.name;
  return (
    <section className="bg-neutral-800">
      <div className="mb-2">
        <p className="section-header-top text-xs font-bold p-2 border-t-2 border-b-2 border-gray-900">
          ITEMS
        </p>
        <ul className="list-none grid">
          {library
            ? library.children.map((file) => (
                <li
                  onClick={() => {
                    if (!isCurrentFile(file)) setCurrentFile(file);
                  }}
                  key={file.name}
                  className={`${
                    isCurrentFile(file) ? "bg-gray-400" : ""
                  } px-2 py-1 text-xs hover:bg-gray-400 hover:cursor-pointer`}
                >
                  {file.name}
                </li>
              ))
            : null}
        </ul>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  library: state.library.currentLibrary,
  currentFile: state.library.currentFile,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFile: (file) => dispatch(setCurrentFile(file)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryContentsView);
