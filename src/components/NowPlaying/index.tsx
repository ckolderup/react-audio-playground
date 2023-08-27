import {
  MusicPlayerContextProps,
  MusicPlayerContext,
} from "@/context/MusicPlayerContext";
import { useContext } from "react";
import { VolumeControl } from "../VolumeControl";

import "./now-playing.css";

export default function NowPlaying() {
  const { volume, setVolume, nowPlayingData } =
    useContext<MusicPlayerContextProps | undefined>(MusicPlayerContext) || {};

  return (
    <div className="now-playing">
      <div>
        {nowPlayingData?.playingArtUrl && (
          <span>
            <img
              className="thumbnail"
              src={nowPlayingData.playingArtUrl}
              alt={`thumbnail art for ${
                nowPlayingData?.playingCredit || "current audio"
              }`}
            />
          </span>
        )}
        {/* TODO: use superimposed icons on thumbnail */}
        <span>{nowPlayingData?.playingRef ? "(playing)" : "(paused)"}</span>{" "}
        <span className="audio-credit">
          {nowPlayingData?.playingCredit || "Nothing playing"}
        </span>
      </div>
      <VolumeControl volume={volume} setVolume={setVolume} />
    </div>
  );
}
