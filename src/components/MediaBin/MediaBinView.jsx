import React from "react";
import { connect } from "react-redux";
import MediaBinContentsView from "./MediaBinContentsView";
import MediaBinDirectoryView from "./MediaBinDirectoryView";

const MediaBinView = ({ libraries }) => {
  const mediaDir = libraries.filter((f) => f.name === "Media");

  return (
    <section
      className="grid grid-cols-2 max-h-[500px]"
      style={{
        gridTemplateColumns: "300px auto",
        gridArea: "Media",
      }}
    >
      <MediaBinDirectoryView library={mediaDir} />
      <MediaBinContentsView />
    </section>
  );
};

const mapStateToProps = (state) => ({
  libraries: state.library.libraries,
});

export default connect(mapStateToProps)(MediaBinView);
