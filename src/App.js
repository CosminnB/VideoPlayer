import "./App.css";
import { VideoStore, StoreProvider } from "./store";
import VideoPlayer from "./VideoPlayer";
function App() {
  const store = new VideoStore();
  return (
    <StoreProvider store={store}>
      <div className="App">
        <VideoPlayer />
      </div>
    </StoreProvider>
  );
}

export default App;
