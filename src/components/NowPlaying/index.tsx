import {
  MusicPlayerContextProps,
  MusicPlayerContext,
} from "@/context/MusicPlayerContext";
import { useContext, useEffect, useRef, useState } from "react";
import { VolumeControl } from "../VolumeControl";

import "./now-playing.css";

function didOverflow(el: HTMLDivElement | null) {
  if (!el) {
    return false;
  }

  if (el.children.length === 2) {
    return el.clientWidth < el.scrollWidth / 2;
  } else {
    return el.clientWidth < el.scrollWidth;
  }
}

export default function NowPlaying() {
  const { volume, setVolume, nowPlayingData } =
    useContext<MusicPlayerContextProps | undefined>(MusicPlayerContext) || {};
  const textInfoRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [textInfoDidOverflow, setTextInfoDidOverflow] = useState(false);
  const textInfo = nowPlayingData?.playingCredit || "Nothing playing";

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    setTextInfoDidOverflow(didOverflow(textInfoRef?.current));
  }, [nowPlayingData, windowWidth]);

  return (
    <div className="now-playing">
      {/* TODO: use superimposed icons on thumbnail */}
      <div className="thumbnail-wrapper">
        <img
          className="thumbnail"
          src={nowPlayingData?.playingArtUrl || "images/eighth-notes.png"}
          alt={`thumbnail art for ${
            nowPlayingData?.playingCredit || "current audio"
          }`}
        />
      </div>
      <div
        className={`text-info-wrapper ${
          textInfoDidOverflow ? "did-overflow" : ""
        }`}
        ref={textInfoRef}
      >
        <div
          className={`text-info ${textInfoDidOverflow ? "did-overflow" : ""}`}
          title={textInfo}
        >
          {textInfo}
        </div>
        {textInfoDidOverflow && (
          <div
            aria-hidden="true"
            className={`text-info ${textInfoDidOverflow ? "did-overflow" : ""}`}
            title={textInfo}
          >
            {textInfo}
          </div>
        )}
      </div>
      <VolumeControl className="volume" volume={volume} setVolume={setVolume} />
    </div>
  );
}
