import RoomHeader from "../components/Roompage/RoomHeader";
import VideoPlayer from "../components/Roompage/VideoPlayer";
import ChatPanel from "../components/Roompage/ChatPanel";

import Fonts from "../styles/Fonts";

const RoomPage = () => {
  return (
    <>
      <Fonts />

      <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
        <RoomHeader />

        <main className="flex flex-1 overflow-hidden p-6">
          <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
            <VideoPlayer />

            <ChatPanel />
          </div>
        </main>
      </div>
    </>
  );
};

export default RoomPage;
