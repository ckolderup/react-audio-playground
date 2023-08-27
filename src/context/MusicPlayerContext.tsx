import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface MusicPlayerContextProviderProps {
  children: ReactNode;
}

export interface MusicPlayerContextProps {
  audioContext: AudioContext;
  playingRef: React.RefObject<HTMLAudioElement> | null;
  setPlayingRef: Dispatch<SetStateAction<React.RefObject<HTMLAudioElement> | null>> | null;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>> | null;
}

export const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(undefined);

export function MusicPlayerContextProvider({ children }: MusicPlayerContextProviderProps) {
  const [playingRef, setPlayingRef] = useState<React.RefObject<HTMLAudioElement> | null>(null);
  const [volume, setVolume] = useState(0.70);
  const audioContext = new AudioContext();

  return (
    <MusicPlayerContext.Provider value={{ audioContext, playingRef, setPlayingRef, volume, setVolume }}>
      {children}
    </MusicPlayerContext.Provider>
  )
}
