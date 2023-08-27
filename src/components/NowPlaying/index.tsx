import {
  MusicPlayerContextProps,
  MusicPlayerContext,
} from "@/context/MusicPlayerContext";
import { useContext } from "react";
import { VolumeControl } from "../VolumeControl";

export default function NowPlaying() {
  const { volume, setVolume, nowPlayingData } =
    useContext<MusicPlayerContextProps | undefined>(MusicPlayerContext) || {};

  return (
    <div className="now-playing">
      <div>
        <span>{nowPlayingData?.playingRef ? "(playing)" : "(paused)"}</span>
        <span className="audio-credit">{nowPlayingData?.playingCredit}</span>
      </div>
      <VolumeControl volume={volume} setVolume={setVolume} />
    </div>
  );
}
