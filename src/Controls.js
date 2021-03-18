import React, { useEffect, useRef, useState } from "react";
import "./Controls.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import SettingsIcon from "@material-ui/icons/Settings";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import {
  Slider,
  Tooltip,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useStore } from "./store";
import { observer } from "mobx-react-lite";

const Controls = observer(() => {
  // useEffect(() => {
  //   window.addEventListener("keydown", (event) => {
  //     console.log(event.key);
  //   });
  // }, []);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const store = useStore();
  const [volumeValue, setVolumeValue] = useState(100);
  const [settingsAnchor, setSettingsAnchor] = useState(null);

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
    <div className="controls">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <IconButton onClick={() => store.setIsPlaying(true)}>
          <PlayCircleFilledIcon />
        </IconButton>

        <IconButton onClick={() => store.setIsPlaying(false)}>
          <PauseCircleFilledIcon />
        </IconButton>

        <Grid item>
          <IconButton>
            <VolumeUpIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3}>
          <Slider
            min={0}
            max={100}
            value={volumeValue}
            onChange={handleVolumeChange}
            aria-label="volume-slider"
          />
        </Grid>

        <IconButton onClick={handleOpenSettings}>
          <SettingsIcon />
        </IconButton>
        <Menu
          id="settings-menu"
          anchorEl={settingsAnchor}
          keepMounted
          open={Boolean(settingsAnchor)}
          onClose={handleCloseSettings}
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
                  {option}x
                </option>
              ))}
            </Select>
          </MenuItem>
        </Menu>

        <IconButton onClick={verify}>
          <FullscreenIcon />
        </IconButton>
      </Grid>
    </div>
  );
});

export default Controls;
