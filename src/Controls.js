import React, { useEffect, useRef, useState } from "react";
import "./Controls.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import SettingsIcon from "@material-ui/icons/Settings";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { Slider, IconButton, Menu, MenuItem, Select } from "@material-ui/core";
import { useStore } from "./store";
import { observer } from "mobx-react-lite";

const Controls = observer(() => {
  useEffect(() => {
    // window.addEventListener("keydown", (event) => {
    //   console.log(event.key);
    // });
    store.setAnchorRef(containerRef.current);
  }, []);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const store = useStore();
  const [volumeValue, setVolumeValue] = useState(100);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [showVolume, setShowVolume] = useState(false);
  const containerRef = useRef(null);

  const activateFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  const deactivateFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  const verify = () => {
    if (store.fullscreenPressed === false || store.fullscreenPressed === null) {
      activateFullscreen(store.divRef);
      store.setFullscreenPressed(true);
    } else if (store.fullscreenPressed === true) {
      deactivateFullscreen();
      store.setFullscreenPressed(false);
    }
  };

  const handleVolumeChange = (e, newValue) => {
    setVolumeValue(newValue);
    store.setVolume(newValue / 100);
  };
  const handleOpenSettings = (e) => {
    setSettingsAnchor(e.currentTarget);
  };
  const handleCloseSettings = () => {
    setSettingsAnchor(null);
  };
  const handleSpeedChange = (e) => {
    store.setPlaybackSpeed(e.target.value);
  };

  return (
    <div className={`controls ${store.isIdle ? "hideElements" : ""}`}>
      <div className="controls__left">
        {store.isPlaying === false || store.isPlaying === null ? (
          <IconButton onClick={() => store.setIsPlaying(true)}>
            <PlayCircleFilledIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => store.setIsPlaying(false)}>
            <PauseCircleFilledIcon />
          </IconButton>
        )}

        <div className="controls__volume">
          <IconButton
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            {store.volume > 0 ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>

          <Slider
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
            className={`${
              !store.isIdle
                ? `controls__volumeSliderHidden ${
                    showVolume ? "controls__volumeSlider" : ""
                  }`
                : "hideElements"
            }`}
            min={0}
            max={100}
            value={volumeValue}
            onChange={handleVolumeChange}
            aria-label="volume-slider"
          />
        </div>
      </div>
      <div className="controls__right" ref={containerRef}>
        <IconButton onClick={handleOpenSettings}>
          <SettingsIcon />
        </IconButton>
        <Menu
          id="settings-menu"
          anchorEl={store.anchorRef}
          open={Boolean(settingsAnchor)}
          onClose={handleCloseSettings}
          container={store.anchorRef}
        >
          <MenuItem>
            Playback Speed:{" "}
            <Select
              native
              value={store.playbackSpeed}
              onChange={handleSpeedChange}
            >
              {speedOptions.map((option) => (
                <option key={`speed-${option}`} value={option}>
                  x{option}
                </option>
              ))}
            </Select>
          </MenuItem>
        </Menu>

        <IconButton onClick={verify}>
          <FullscreenIcon />
        </IconButton>
      </div>
    </div>
  );
});

export default Controls;
