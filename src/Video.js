import { Tooltip, withStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import Slider from "@material-ui/core/Slider";
import React, { useEffect, useRef, useState } from "react";
import "./Video.css";
import { useStore } from "./store";
import Controls from "./Controls";

const Video = observer(() => {
  const videoRef = useRef(null);
  const hoverRef = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [currentTooltipTime, setCurrentTooltipTime] = useState("0:00");
  const [sliderValue, setSliderValue] = useState(null);

  const store = useStore();

  useEffect(() => {
    store.setTooltipAnchor(containerRef.current);
    if (store.isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    videoRef.current.volume = store.volume;

    videoRef.current.playbackRate = store.playbackSpeed;
  }, [
    store.isPlaying,
    store.volume,
    store.playbackSpeed,
    store.fullscreen,
    store.tooltipAnchor,
  ]);
  useEffect(() => {
    let timer;
    let fadeInBuffer = false;
    let inactivityTime = 4; //in secunde

    videoRef.current.onmousemove = () => {
      if (!fadeInBuffer) {
        if (timer) {
          clearTimeout(timer);
          timer = 0;
        }
      } else {
        store.setIsIdle(false);
        fadeInBuffer = false;
      }

      timer = setTimeout(() => {
        store.setIsIdle(true);
        fadeInBuffer = true;
      }, inactivityTime * 1000);
    };
  }, []);

  const calcTime = (seconds, option) => {
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

    //14-5 pt mm:ss
    //15-4 pt m:ss
    //11-8 pt hh:mm:ss
    //12-7 pt h:mm:ss
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
    if (videoRef.current.currentTime === videoRef.current.duration) {
      store.setIsPlaying(false);
    }
  };

  return (
    <div
      className="video__wrapper "
      ref={wrapperRef}
      onMouseEnter={() => store.setIsIdle(false)}
      onMouseLeave={() => store.isPlaying && store.setIsIdle(true)}
    >
      <div
        className={`overlay ${store.isIdle ? "hideCursor hideElements" : ""}`}
      ></div>
      <video
        onClick={() => {
          if (store.isPlaying === false || store.isPlaying === null) {
            store.setIsPlaying(true);
          } else {
            store.setIsPlaying(false);
          }
        }}
        ref={videoRef}
        className={`video__source ${
          store.fullscreenPressed ? "video__fullscreen" : ""
        } ${store.isIdle ? "hideCursor" : ""}`}
        onTimeUpdate={seektimeupdate}
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
      </video>

      <Tooltip
        className={`video__timeline ${store.isIdle ? "hideElements" : ""}`}
        placement="top"
        ref={containerRef}
        title={currentTooltipTime}
        PopperProps={{ container: store.tooltipAnchor }}
      >
        <span ref={hoverRef} onMouseMove={(e) => handleHoverSeeking(e)}>
          {/* la label slider afisam timpul la care suntem convertit in format h:m:s */}
          <Slider
            value={sliderValue}
            aria-label="continuous-slider"
            min={0}
            max={100}
            onChange={handleDrag}
            sx={{
              "&:hover .MuiSlider-rail": {
                height: "6px",
                opacity: 0.43,
                borderRadius: "3px",
              },
              "&:hover  .MuiSlider-track": {
                height: "6px",
                borderRadius: "3px",
              },
              "&:hover .MuiSlider-thumb": { marginTop: "-4px" },
            }}
          />
        </span>
      </Tooltip>
      <img
        className={`play__shadow ${store.isPlaying ? "play__animate" : ""} ${
          store.isIdle ? "hideElements" : ""
        }`}
        src="/svg/play.svg"
        alt="playVideo"
        onClick={() => {
          if (store.isPlaying === false || store.isPlaying === null) {
            store.setIsPlaying(true);
          } else {
            store.setIsPlaying(false);
          }
        }}
      />

      <img
        className={`pause__shadow ${
          store.isPlaying === false ? "pause__animate" : ""
        } ${store.isIdle ? "hideElements" : ""}`}
        src="/svg/pause.svg"
        alt="pauseVideo"
        onClick={() => {
          if (store.isPlaying === false || store.isPlaying === null) {
            store.setIsPlaying(true);
          } else {
            store.setIsPlaying(false);
          }
        }}
      />
      <Controls />
    </div>
  );
});

export default Video;
