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

function testForVolumeControlAccess(): Promise<boolean> {
  const timeoutPromise = new Promise<boolean>((resolve) =>
    setTimeout(resolve, 1e2, false),
  );
  const promise = new Promise<boolean>((resolve) => {
    let audio: HTMLAudioElement | null = document.createElement("audio");
    const handler = () => {
      audio?.removeEventListener("volumechange", handler);
      audio = null;

      resolve(true);
    };

    audio.addEventListener("volumechange", handler);

    audio.volume = 0.5;
  });

  return Promise.race([promise, timeoutPromise]);
}

export default function NowPlaying() {
  const { volume, setVolume, nowPlayingData } =
    useContext<MusicPlayerContextProps | undefined>(MusicPlayerContext) || {};
  const textInfoRef = useRef(null);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [textInfoDidOverflow, setTextInfoDidOverflow] = useState(false);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const volumeControlWrapper = async () => {
      try {
        setShowVolumeControl(await testForVolumeControlAccess());
      } catch {
        setShowVolumeControl(false);
      }
    };

    volumeControlWrapper();

    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    setTextInfoDidOverflow(didOverflow(textInfoRef?.current));
  }, [nowPlayingData, windowWidth]);

  const textInfo = nowPlayingData?.playingCredit || "Nothing playing";

  return (
    <div className={`now-playing ${showVolumeControl ? "" : "no-volume"}`}>
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
      {showVolumeControl && (
        <VolumeControl
          className="volume"
          volume={volume}
          setVolume={setVolume}
        />
      )}
    </div>
  );
}
