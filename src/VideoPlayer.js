import React, { useEffect, useRef } from "react";
import Controls from "./Controls";
import { useStore } from "./store";
import "./VideoPlayer.css";
function VideoPlayer() {
  const videoRef = useRef(null);
  const store = useStore();

  useEffect(() => {
    // console.log(videoRef.duration, " length of video");
    // if (!store.duration) {
    //   store.setDuration(videoRef.duration);
    // }
  }, []);

  return (
    <div className="player">
      <video
        className="player__video"
        ref={videoRef}
        onLoadedMetadata={(e) => {
          store.setDuration(e.target.duration);
        }}
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
      </video>
      <Controls />
    </div>
  );
}

export default VideoPlayer;
