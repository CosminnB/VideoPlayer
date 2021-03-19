import "./App.css";
import { VideoStore, StoreProvider } from "./store";
import VideoPlayer from "./VideoPlayer";
function App() {
  const store = new VideoStore();
  return (
    <StoreProvider store={store}>
      <div className="app">
        <h1 className="app__title">The VideoPlayer</h1>
        <VideoPlayer />
      </div>
    </StoreProvider>
  );
}

export default App;
