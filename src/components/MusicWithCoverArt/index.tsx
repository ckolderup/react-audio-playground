import PlayButton from '@/components/PlayButton';
import { useContext, useEffect, useRef, useState } from 'react';
import { MusicPlayerContext } from '@/context/MusicPlayerContext';
import type { MusicPlayerContextProps } from '@/context/MusicPlayerContext';

import './music-with-cover-art.css';

interface MusicWithCoverArtProps {
  className?: string;
  audioUrl: string;
  imageUrl: string;
  songCredit: string;
}


// TODO: use AudioContext from MusicPlayerContext to make it more seamless when switching between songs
export default function MusicWithCoverArt({ audioUrl, imageUrl, songCredit, className }: MusicWithCoverArtProps) {
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { playingRef, setPlayingRef, volume} = useContext<MusicPlayerContextProps | undefined>(MusicPlayerContext) || {};

  useEffect(() => {
    if (playingRef == audioRef) { return; }
    if (!audioRef.current) { return; }

    setPlaying(false);
  }, [playingRef]);

  useEffect(() => {
    if (!audioRef.current) { return; }
    audioRef.current.volume = volume || 1.0;
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) { return; }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  async function togglePlaying() {
    if (!setPlayingRef || !audioRef.current) { return; }

    const nowPlaying = !isPlaying;
    setPlayingRef(audioRef);
    setPlaying(nowPlaying);
  }

  return (
    <div className={`music-player ${className}`}>
      <audio hidden src={audioUrl} ref={audioRef} />
      <div className="button-overlay-wrap" onClick={togglePlaying}>
        <img className="cover-art" src={imageUrl} alt={`key art for song ${songCredit}`} />
        <PlayButton className={`play-button ${isPlaying ? 'play' : 'pause'}`} />
      </div>
    </div>
  );
}
