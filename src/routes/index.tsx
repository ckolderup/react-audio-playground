import MusicWithCoverArt from "@/components/MusicWithCoverArt";

import "@/routes/index.css";

export default function Index() {
  return (
    <>
      <MusicWithCoverArt
        songCredit="Mura Masa - No Hope Generation"
        audioUrl="data/mura masa - no hope generation/no-hope-generation.mp3"
        imageUrl="data/mura masa - no hope generation/ryc.jpg"
      />
      <MusicWithCoverArt
        songCredit="Proc Fiskal - Leith Tornn Carnal"
        audioUrl="data/proc fiskal - leith tornn carnal/leith-tornn-carnal.mp3"
        imageUrl="data/proc fiskal - leith tornn carnal/siren-spine-sysex.jpg"
      />
    </>
  );
}
