import RoomHeader from "../components/Roompage/RoomHeader";
import VideoPlayer from "../components/Roompage/VideoPlayer";
import ChatPanel from "../components/Roompage/ChatPanel";

import Fonts from "../styles/Fonts";

import useRoomStore from "../stores/room.store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoomPage = () => {
  const loadRoom = useRoomStore((state) => state.loadRoom);

  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomId) {
      return;
    }

    const initRoom = async () => {
      const room = await loadRoom(roomId);

      console.log("Loaded room:", room);

      if (!room) {
        navigate("/error");
      }
    };

    initRoom();
  }, [roomId, navigate, loadRoom]);

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
