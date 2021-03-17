import React, { useRef, useState } from "react";
import "./Controls.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import SettingsIcon from "@material-ui/icons/Settings";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import { Slider, Tooltip, IconButton } from "@material-ui/core";
import { useStore } from "./store";
import { observer } from "mobx-react-lite";

const Controls = () => {
  const [value, setValue] = useState(0);
  const hoverRef = useRef(null);
  const store = useStore();
  const [currentTime, setCurrentTime] = useState(0);

  const calcTime = (seconds) => {
    let data = new Date(seconds).toISOString();

    let hours = data.substr(11, 2);
    let mins = data.substr(14, 2);
    let secs = data.substr(17, 2);

    //11-12 ora
    //14-15 min
    //17-18 sec
    if (hours === "00" && mins === "00") {
      setCurrentTime(data.substr(15, 4));
    } else if (hours === "00" && mins !== "00") {
      setCurrentTime(data.substr(14, 5));
    } else if (hours !== "00") {
      setCurrentTime(data.substr(11, 8));
    }

    //14-5 pt mm-ss
    //15-4 pt m-ss
    //11-8 pt hh-mm-ss
    //12-7 pt h-mm-ss
  };

  const handleChange = (e, newValue) => {
    calcTime(newValue);
    setValue(newValue);
  };

  const handleMouseMove = (e) => {
    //conditie sa fie mai > 0
    if (
      e.nativeEvent.offsetX >= 0 &&
      e.nativeEvent.offsetX <= hoverRef.current.offsetWidth
    ) {
      let hoverValue = e.nativeEvent.offsetX;
      let elLength = hoverRef.current.offsetWidth;

      let percent = (hoverValue * 100) / elLength;

      //extragem x% din lung video(in secunde)

      let seconds = (percent / 100) * store.duration;

      calcTime(seconds * 1000);
    }
  };

  return (
    <div className="controls">
      <Tooltip placement="top" title={currentTime}>
        <span ref={hoverRef} onMouseMove={(e) => handleMouseMove(e)}>
          {/* la label slider afisam timpul la care suntem convertit in format h:m:s */}
          <Slider
            value={value}
            aria-label="continuous-slider"
            min={0}
            max={store.duration * 1000} //milisecunde
            onChange={handleChange}
            // valueLabelDisplay="auto"
            onMouseEnter={(e) => setValue(e.target.value)}
          />
        </span>
      </Tooltip>

      <IconButton>
        <PlayCircleFilledIcon />
      </IconButton>

      <IconButton>
        <SkipNextIcon />
      </IconButton>

      <IconButton>
        <VolumeUpIcon />
      </IconButton>

      <IconButton>
        <SettingsIcon />
      </IconButton>

      <IconButton>
        <FullscreenIcon />
      </IconButton>
    </div>
  );
};

export default Controls;
