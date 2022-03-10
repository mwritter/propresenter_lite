import React from "react";
import { connect } from "react-redux";
import MediaBinContentsView from "./MediaBinContentsView";
import MediaBinDirectoryView from "./MediaBinDirectoryView";
//two componets one for the files and the other for the previews
const MediaBinView = ({ libraries }) => {
  const mediaDir = libraries.filter((f) => f.name === "Media");

  return (
    <>
      <MediaBinDirectoryView library={mediaDir} />
      <MediaBinContentsView />
    </>
  );
};

const mapStateToProps = (state) => ({
  libraries: state.library.libraries,
});

export default connect(mapStateToProps)(MediaBinView);
