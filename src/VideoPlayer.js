import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import Controls from "./Controls";
import { useStore } from "./store";
import Video from "./Video";
import "./VideoPlayer.css";
const VideoPlayer = observer(() => {
  const playerRef = useRef(null);
  const store = useStore();
  useEffect(() => {
    // console.log(store.fullscreenPressed);
    store.setDivRef(playerRef.current);
  }, []); //store.fullscreenPressed

  function activateFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  const deactivateFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };
  return (
    <div className="player" ref={playerRef}>
      <Video />
      <Controls />
    </div>
  );
});

export default VideoPlayer;
