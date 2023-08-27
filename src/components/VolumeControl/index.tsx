import { MusicPlayerContext, MusicPlayerContextProps } from '@/context/MusicPlayerContext';
import { ChangeEvent, useContext } from 'react';

export function VolumeControl() {
  const { volume, setVolume } = useContext<MusicPlayerContextProps | undefined>(MusicPlayerContext) || { volume: 1.0 };

  function handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    if (!setVolume) { return };

    setVolume(parseInt(event.target.value) / 100);
  }
  return (
    <input
      type="range"
      min="1"
      max="100"
      value={volume * 100}
      onChange={handleVolumeChange}
      className="volume-control"
    />
  );
}
