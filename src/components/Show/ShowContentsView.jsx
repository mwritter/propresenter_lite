import React, { useState } from "react";
import { connect } from "react-redux";
import { ACTIONS } from "../../context/Projector/ProjectorActions";
import { emit } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api";
import { setCurrentMediaText } from "../../redux/media/media.actions";
const ShowContentsView = ({ currentFiles, setCurrentMediaText }) => {
  const [selectedSlide, setSelectedSlide] = useState(null);

  const isCurrentlySelected = (id) => {
    return selectedSlide && selectedSlide.id === id;
  };

  const onSelectSlide = (slide, id) => {
    if (!isCurrentlySelected(id)) {
      setSelectedSlide({ text: slide.text, id });
    }
  };
  // TODO: add 'section' name above 'title'
  return (
    <section
      className="grid h-1000px mx-2
      overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-600 overflow-y-scroll"
      style={{ gridArea: "Show" }}
    >
      {currentFiles.length
        ? currentFiles.map(({ data }, i) => (
            <div key={`${data}-${i}`}>
              <div className="bg-slate-800 w-full my-5 rounded-lg">
                <p className="p-2">{data.title}</p>
              </div>
              <div
                className="grid justify-center h-min"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(300px, 350px))",
                }}
              >
                {data.slides?.map((slide, j) => (
                  <div
                    onClick={() => {
                      invoke("text_selected", { text: slide.text }).then(() => {
                        emit(ACTIONS.UPDATE_TEXT);
                        onSelectSlide(slide, `${i}-${j}`);
                        setCurrentMediaText(slide.text);
                      });
                    }}
                    key={`${i}-${j}`}
                    id={`${i}-${j}`}
                    className={`${
                      isCurrentlySelected(`${i}-${j}`)
                        ? "border-4 border-green-300"
                        : "border-4 border-gray-500 border-opacity-50"
                    } rounded-xl h-[200px] grid grid-rows-2 m-3 hover:cursor-pointer bg-slate-600 bg-opacity-30`}
                    style={{ alignItems: "end" }}
                  >
                    <p className="text-sm font-thin text-center flex-1 px-5">
                      {slide.text}
                    </p>
                    <div className="bg-gray-400 mb-1 h-3 w-[90%] justify-self-center rounded-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentFiles: state.library.currentFiles,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentMediaText: (text) => dispatch(setCurrentMediaText(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowContentsView);
