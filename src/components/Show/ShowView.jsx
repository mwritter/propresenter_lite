import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowContentsView from "./ShowContentsView";
import ShowVerseView from "./ShowVerseView";

const ShowView = () => {
  return (
    <Routes>
      <Route path="/" element={<ShowContentsView />} />
      <Route path="/verses" element={<ShowVerseView />} />
    </Routes>
  );
};

export default ShowView;
