import RoomHeader from "../components/Roompage/RoomHeader";
import VideoPlayer from "../components/Roompage/VideoPlayer";
import ChatPanel from "../components/Roompage/ChatPanel";
import VideoInput from "../components/Roompage/VideoInput";

/* Room Page */
const RoomPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <RoomHeader />

      <main className="p-6 md:p-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          <VideoPlayer />

          <ChatPanel />
        </div>

        <VideoInput />
      </main>
    </div>
  );
};

export default RoomPage;
