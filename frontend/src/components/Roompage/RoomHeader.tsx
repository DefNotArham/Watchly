import { useNavigate } from "react-router-dom";

import useRoomStore from "../../stores/room.store";
import socket from "../../lib/socket.io";

type Props = {
  onInvite: () => void;
  roomId: string;
};

const RoomHeader = ({ onInvite, roomId }: Props) => {
  const navigate = useNavigate();

  const currentRoom = useRoomStore((state) => state.currentRoom);

  return (
    <header className="border-b border-slate-800">
      <div className="flex flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between md:px-12">
        {/* Logo + Room Code */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src="../logo.png"
              className="w-10 cursor-pointer"
              alt=""
              onClick={() => navigate("/")}
            />

            <h1
              className="font-title cursor-pointer text-2xl sm:text-3xl"
              onClick={() => navigate("/")}
            >
              Watchly
            </h1>
          </div>

          <p className="text-sm text-slate-400">
            Room Code:{" "}
            <span className="font-semibold text-blue-500">
              {currentRoom?.joinCode}
            </span>
          </p>
        </div>

        {/* Youtube Input */}
        <div className="flex flex-1 gap-2 md:max-w-xl">
          <input
            placeholder="Paste YouTube link..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm outline-none focus:border-blue-500"
          />

          <button className="cursor-pointer rounded-lg bg-blue-500 px-5 text-sm font-medium text-white hover:bg-blue-400">
            Load
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onInvite}
            className="cursor-pointer rounded-lg border border-slate-700 px-3 py-2 text-xs hover:bg-slate-900 sm:px-4 sm:text-sm"
          >
            Copy Invite
          </button>

          <button
            onClick={() => {
              const clientId = localStorage.getItem("clientId");

              socket.emit("leave-room", {
                clientId,
                roomId,
              });

              socket.disconnect();

              navigate("/");
            }}
            className="cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-xs hover:bg-red-500 sm:px-4 sm:text-sm"
          >
            Leave Room
          </button>
        </div>
      </div>
    </header>
  );
};

export default RoomHeader;
