import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useStore } from "./store";
import Video from "./Video";
import "./VideoPlayer.css";
const VideoPlayer = observer(() => {
  const playerRef = useRef(null);
  const store = useStore();
  useEffect(() => {
    store.setDivRef(playerRef.current);
  }, [playerRef]);

  return (
    <div className="player" ref={playerRef}>
      <Video />
    </div>
  );
});

export default VideoPlayer;
