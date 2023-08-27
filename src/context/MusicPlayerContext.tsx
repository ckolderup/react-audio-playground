import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface MusicPlayerContextProviderProps {
  children: ReactNode;
}

export interface NowPlayingData {
  playingRef?: React.RefObject<HTMLAudioElement>;
  playingCredit?: string;
}

export interface MusicPlayerContextProps {
  nowPlayingData: NowPlayingData | null;
  setNowPlayingData: Dispatch<SetStateAction<NowPlayingData>> | null;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>> | null;
}

export const MusicPlayerContext = createContext<
  MusicPlayerContextProps | undefined
>(undefined);

export function MusicPlayerContextProvider({
  children,
}: MusicPlayerContextProviderProps) {
  const [nowPlayingData, setNowPlayingData] = useState<NowPlayingData>({});
  const [volume, setVolume] = useState(0.7);

  return (
    <MusicPlayerContext.Provider
      value={{
        nowPlayingData,
        setNowPlayingData,
        volume,
        setVolume,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}
