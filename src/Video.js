import { Slider, Tooltip } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import "./Controls.css";
import { useStore } from "./store";

const Video = observer(() => {
  const videoRef = useRef(null);
  const hoverRef = useRef(null);
  const [currentTooltipTime, setCurrentTooltipTime] = useState("0:00");
  const [sliderValue, setSliderValue] = useState(null);
  const store = useStore();

  useEffect(() => {
    if (store.isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    videoRef.current.volume = store.volume;

    videoRef.current.playbackRate = store.playbackSpeed;
  }, [store.isPlaying, store.volume, store.playbackSpeed, store.fullscreen]);

  const calcTime = (seconds) => {
    let data = new Date(Math.floor(seconds)).toISOString();

    let hours = data.substr(11, 2);
    let mins = data.substr(14, 2);
    let secs = data.substr(17, 2);

    if (hours === "00" && mins === "00") {
      setCurrentTooltipTime(data.substr(15, 4));
    } else if (hours === "00" && mins !== "00") {
      setCurrentTooltipTime(data.substr(14, 5));
    } else if (hours !== "00") {
      setCurrentTooltipTime(data.substr(11, 8));
    }
    //14-5 pt mm-ss
    //15-4 pt m-ss
    //11-8 pt hh-mm-ss
    //12-7 pt h-mm-ss
  };

  const handleHoverSeeking = (e) => {
    //conditie sa fie mai > 0
    if (
      e.nativeEvent.offsetX >= 0 &&
      e.nativeEvent.offsetX <= hoverRef.current.offsetWidth
    ) {
      let hoverValue = e.nativeEvent.offsetX;
      let elLength = hoverRef.current.offsetWidth;

      let percent = (hoverValue * 100) / elLength;

      //extragem x% din lung video(in secunde)
      let seconds = (percent / 100) * Math.floor(videoRef.current.duration);

      calcTime(seconds * 1000);
    }
  };

  const handleDrag = (e, newValue) => {
    let seekto = Math.floor(videoRef.current.duration * (newValue / 100));
    setSliderValue(newValue);
    videoRef.current.currentTime = seekto;
  };

  const seektimeupdate = () => {
    let n = videoRef.current.currentTime * (100 / videoRef.current.duration);

    setSliderValue(n);
  };

  return (
    <div>
      <video
        ref={videoRef}
        className="player__video"
        onTimeUpdate={seektimeupdate}
      >
        <source src="/videos/video2.mp4" type="video/mp4" />
      </video>

      <Tooltip placement="top" title={currentTooltipTime}>
        <span ref={hoverRef} onMouseMove={(e) => handleHoverSeeking(e)}>
          {/* la label slider afisam timpul la care suntem convertit in format h:m:s */}
          <Slider
            value={sliderValue}
            aria-label="continuous-slider"
            min={0}
            max={100} //milisecunde
            onChange={handleDrag}
          />
        </span>
      </Tooltip>
    </div>
  );
});

export default Video;
