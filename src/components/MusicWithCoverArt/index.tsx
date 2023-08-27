import PlayButton from "@/components/PlayButton";
import {
  KeyboardEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";
import type { MusicPlayerContextProps } from "@/context/MusicPlayerContext";

import "./music-with-cover-art.css";

interface MusicWithCoverArtProps {
  className?: string;
  audioUrl: string;
  imageUrl: string;
  songCredit: string;
}

export default function MusicWithCoverArt({
  audioUrl,
  imageUrl,
  songCredit,
  className,
}: MusicWithCoverArtProps) {
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { volume, nowPlayingData, setNowPlayingData } =
    useContext<MusicPlayerContextProps | undefined>(MusicPlayerContext) || {};

  useEffect(() => {
    if (nowPlayingData?.playingRef === audioRef) {
      return;
    }
    if (!audioRef.current) {
      return;
    }

    setPlaying(false);
  }, [nowPlayingData?.playingRef]);

  useEffect(() => {
    if (!audioRef.current || !volume) {
      return;
    }
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!setNowPlayingData) {
      return;
    }
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      setNowPlayingData({
        playingRef: audioRef,
        playingCredit: songCredit,
        playingArtUrl: imageUrl,
      });
      audioRef.current.play();
    } else {
      if (nowPlayingData?.playingRef === audioRef) {
        setNowPlayingData({ ...nowPlayingData, playingRef: undefined });
      }
      audioRef.current.pause();
    }
  }, [isPlaying]);

  async function togglePlayingViaKeyboard(
    event: KeyboardEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    if (["Space"].includes(event.code)) {
      // Enter is apparently handled by the MouseEvent
      togglePlaying(event);
    }
  }

  async function togglePlaying(
    event: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    if (!setNowPlayingData || !audioRef.current) {
      return;
    }

    const nowPlaying = !isPlaying;
    setPlaying(nowPlaying);
  }

  return (
    <div className={`music-player ${className}`}>
      <audio hidden src={audioUrl} ref={audioRef} />
      <button
        type="button"
        className="button-overlay-wrap"
        onKeyUp={togglePlayingViaKeyboard}
        onClick={togglePlaying}
      >
        <img
          className="cover-art"
          src={imageUrl}
          alt={`key art for song ${songCredit}`}
        />
        <PlayButton className={`play-button ${isPlaying ? "play" : "pause"}`} />
      </button>
    </div>
  );
}
