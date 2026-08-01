import RoomHeader from "../components/Roompage/RoomHeader";
import VideoPlayer from "../components/Roompage/VideoPlayer";
import ChatPanel from "../components/Roompage/ChatPanel";

import RoomSkeleton from "../components/skeletons/RoomSkeleton";

import Fonts from "../styles/Fonts";

import { CiLink } from "react-icons/ci";
import { GoNumber } from "react-icons/go";

import useRoomStore from "../stores/room.store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoomPage = () => {
  const loadRoom = useRoomStore((state) => state.loadRoom);
  const loadRoomLoading = useRoomStore((state) => state.loadRoomLoading);
  const currentRoom = useRoomStore((state) => state.currentRoom);

  const { roomId } = useParams();
  const navigate = useNavigate();

  const [inviteOpen, setInviteOpen] = useState(false);

  const [linkCopied, setLinkCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    if (!roomId) {
      navigate("/error");
      return;
    }

    const initRoom = async () => {
      const room = await loadRoom(roomId);

      if (!room) {
        navigate("/error");
      }
    };

    initRoom();
  }, [roomId, loadRoom, navigate]);

  if (loadRoomLoading) {
    return <RoomSkeleton />;
  }

  return (
    <>
      <Fonts />

      <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
        <RoomHeader onInvite={() => setInviteOpen(true)} />

        <main className="flex flex-1 overflow-hidden p-6">
          <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
            <VideoPlayer />

            <ChatPanel />
          </div>
        </main>
      </div>

      {inviteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setInviteOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-100">
                Invite Friends
              </h2>

              <button
                onClick={() => setInviteOpen(false)}
                className="cursor-pointer text-2xl text-slate-400 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Share a room link or let someone join using the room code.
            </p>

            {/* Share Link */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CiLink size={24} className="text-blue-500" />

                <h3 className="font-medium text-slate-100">Share Link</h3>
              </div>

              <input
                readOnly
                value={`${window.location.origin}/room/${currentRoom?._id}`}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 outline-none"
              />

              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `${window.location.origin}/room/${currentRoom?._id}`,
                  );

                  setLinkCopied(true);

                  setTimeout(() => {
                    setLinkCopied(false);
                  }, 2000);
                }}
                className="mt-3 w-full cursor-pointer rounded-lg bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-400"
              >
                {linkCopied ? "✓ Copied!" : "Copy Link"}
              </button>
            </div>

            {/* Room Code */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="mb-2 flex items-center gap-2">
                <GoNumber size={24} className="text-blue-500" />
                <h3 className="font-medium text-slate-100">Room Code</h3>
              </div>

              <input
                readOnly
                value={currentRoom?.joinCode ?? ""}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-center text-xl font-bold tracking-[0.4em] text-blue-400 outline-none"
              />

              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    currentRoom?.joinCode ?? "",
                  );

                  setCodeCopied(true);

                  setTimeout(() => {
                    setCodeCopied(false);
                  }, 2000);
                }}
                className="mt-3 w-full cursor-pointer rounded-lg border border-slate-700 py-2 font-medium text-slate-200 transition hover:bg-slate-800"
              >
                {codeCopied ? "✓ Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomPage;
