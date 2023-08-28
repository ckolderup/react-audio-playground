import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface VolumeControlProps {
  volume: number | undefined;
  setVolume: Dispatch<SetStateAction<number>> | null | undefined;
  className?: string;
}

export function VolumeControl({
  volume,
  setVolume,
  className,
}: VolumeControlProps) {
  function handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    if (!setVolume) {
      return;
    }

    setVolume(parseInt(event.target.value) / 100);
  }

  return (
    <div className={className}>
      <label>
        volume {/* TODO: replace with icon, make it clickable to mute*/}
        <input
          disabled={!(volume && setVolume)}
          type="range"
          min="1"
          max="100"
          value={(volume || 1) * 100}
          onChange={handleVolumeChange}
          className="volume-control"
        />
      </label>
    </div>
  );
}
