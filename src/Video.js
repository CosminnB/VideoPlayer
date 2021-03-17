import React from "react";
import { useStore } from "./store";

function Video() {
  const store = useStore();
  return (
    <video
      className="player__video"
      onLoadedMetadata={(e) => {
        store.setDuration(Math.floor(e.target.duration));
      }}
    >
      <source src="/videos/video1.mp4" type="video/mp4" />
    </video>
  );
}

export default Video;
