import React from "react";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { connect } from "react-redux";
import { setCurrentMediaFile } from "../../redux/media/media.actions";

function MediaBinContentsView({
  currentMediaLibrary,
  currentMediaFile,
  setCurrentMediaFile,
}) {
  const isCurrentFile = (f) => currentFile && f.name === currentFile.name;
  console.log(currentMediaLibrary);
  return (
    <section className="bg-neutral-900 mx-2 grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-5 gap-2">
      {currentMediaLibrary
        ? currentMediaLibrary.children.map((file) => (
            <div key={file.name}>
              <img src={convertFileSrc(file.path)} alt={file.name} />
              <p className="text-xs font-thin pt-2 text-gray-500">
                {file.name}
              </p>
            </div>
          ))
        : null}
    </section>
  );
}

const mapStateToProps = (state) => ({
  currentMediaFile: state.media.currentMediaFile,
  currentMediaLibrary: state.media.currentMediaLibrary,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentMediaFile: (file) => dispatch(setCurrentMediaFile(file)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaBinContentsView);
