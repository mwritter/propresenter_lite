import LibraryView from "./components/Library/LibraryView";
import MediaBinView from "./components/MediaBin/MediaBinView";
import "./App.css";

function App() {
  return (
    <div className="App h-screen text-white px-2">
      <LibraryView />
      <main>Main Section</main>
      <section>Preview Section</section>
      <MediaBinView />
    </div>
  );
}

export default App;
