import React from "react";
import { useNavigate } from "react-router-dom";

const ShowVerseView = () => {
  const navigate = useNavigate();
  return (
    <section style={{ gridArea: "Show" }}>
      <button
        onClick={() => navigate("/")}
        className="bg-neutral-400 px-3 py-1 rounded-lg m-5"
      >
        Back
      </button>
      <h1>ShowVerseView</h1>
    </section>
  );
};

export default ShowVerseView;
