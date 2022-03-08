import { useState } from "react";
import LibraryView from "./components/Library/LibraryView";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <LibraryView />
      <div></div>
    </div>
  );
}

export default App;
