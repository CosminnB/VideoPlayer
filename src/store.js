import { makeAutoObservable } from "mobx";
import React, { createContext, useContext } from "react";
class VideoStore {
  isPlaying = null;
  volume = 1;
  playbackSpeed = 1;
  fullscreenPressed = null;
  divRef = null;
  anchorRef = null;
  tooltipAnchor = null;
  isIdle = false;
  currentTime = "0:00";
  duration = "0:00";

  constructor() {
    makeAutoObservable(this);
  }

  setIsPlaying(y) {
    this.isPlaying = y;
  }
  setVolume(vol) {
    this.volume = vol;
  }
  setPlaybackSpeed(speed) {
    this.playbackSpeed = speed;
  }
  setFullscreenPressed(bool) {
    this.fullscreenPressed = bool;
  }
  setDivRef(ref) {
    this.divRef = ref;
  }
  setAnchorRef(ref) {
    this.anchorRef = ref;
  }
  setTooltipAnchor(ref) {
    this.tooltipAnchor = ref;
  }
  setIsIdle(bool) {
    this.isIdle = bool;
  }
  setCurrentTime(time) {
    this.currentTime = time;
  }
  setDuration(time) {
    this.duration = time;
  }
}

const StoreContext = createContext(new VideoStore());

const StoreProvider = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { VideoStore, StoreProvider, useStore };
