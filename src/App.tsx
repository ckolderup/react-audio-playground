import { Fragment } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import useDebugRender from "tilg";
import { MusicPlayerContextProvider } from "@/context/MusicPlayerContext";
import NowPlaying from "./components/NowPlaying";

export default function App() {
  useDebugRender();

  return (
    <Fragment>
      <MusicPlayerContextProvider>
        <NowPlaying />
        <Outlet />
        <ScrollRestoration />
      </MusicPlayerContextProvider>
    </Fragment>
  );
}
