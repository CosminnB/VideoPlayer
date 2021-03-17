import React, { useEffect, useRef } from "react";
import Controls from "./Controls";
import { useStore } from "./store";
import Video from "./Video";
import "./VideoPlayer.css";
function VideoPlayer() {
  const store = useStore();

  return (
    <div className="player">
      <Video />
      <Controls />
    </div>
  );
}

export default VideoPlayer;
