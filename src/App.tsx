import { Fragment } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import useDebugRender from "tilg";
import { MusicPlayerContextProvider } from "@/context/MusicPlayerContext";
import { VolumeControl } from "./components/VolumeControl";

export default function App() {
  useDebugRender();

  return (
    <Fragment>
      <MusicPlayerContextProvider>
        <VolumeControl/>
        <Outlet />
        <ScrollRestoration />
      </MusicPlayerContextProvider>
    </Fragment>
  );
}
