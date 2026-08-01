import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useRoomStore from "../../stores/room.store";

import { SyncLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";
import { MdError } from "react-icons/md";
import useUserStore from "../../stores/user.store";

const Hero = () => {
  const {
    createRoom,
    createRoomLoading,
    joinRoom,
    joinRoomLoading,
    joinRoomError,
  } = useRoomStore();

  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();

  const [joinRoomPopup, setJoinRoomPopup] = useState(false);

  const [createRoomPopup, setCreateRoomPopup] = useState(false);

  const [joinCode, setJoinCode] = useState("");
  const [username, setUsername] = useState(user?.username ?? "");

  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm tracking-[0.3em] text-blue-500">Watchly</p>

      <h1 className="font-title mt-5 text-7xl text-slate-100 md:text-8xl">
        <TypeAnimation
          sequence={[
            "Watch Videos",
            2000,
            "Share Moments",
            2000,
            "Enjoy Content",
            2000,
          ]}
          speed={50}
          repeat={Infinity}
        />

        <br />

        <span className="text-blue-500">Together.</span>
      </h1>

      <p className="mt-6 max-w-xl text-slate-400">
        A shared space for watching, chatting, and enjoying videos together.
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => {
            setCreateRoomPopup(true);
          }}
          className="cursor-pointer rounded-full bg-blue-500 px-7 py-3 font-semibold text-white transition hover:bg-blue-400 flex items-center"
        >
          {createRoomLoading ? (
            <SyncLoader size={5} color="#fff" />
          ) : (
            "Create room"
          )}
        </button>

        <button
          onClick={() => {
            setJoinRoomPopup(true);
          }}
          className="cursor-pointer rounded-full border border-slate-700 px-7 py-3 text-slate-100 transition hover:bg-slate-900"
        >
          Join Room
        </button>
      </div>

      {joinRoomPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setJoinRoomPopup(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-100">
                Join a Room
              </h2>

              <button
                onClick={() => setJoinRoomPopup(false)}
                className="cursor-pointer text-2xl text-slate-400 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Enter the room code to join your friends.
            </p>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-6 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-center text-lg uppercase tracking-[0.3em] text-slate-100 outline-none transition focus:border-blue-500"
            />

            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Room Code"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-center text-lg uppercase tracking-[0.3em] text-slate-100 outline-none transition focus:border-blue-500"
            />

            {usernameError && (
              <p className="mt-2 text-sm text-red-500">{usernameError}</p>
            )}

            {joinRoomError && (
              <p className="mt-3 text-sm text-red-500 flex items-center gap-2 justify-center">
                <MdError />
                {joinRoomError}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                disabled={joinRoomLoading}
                onClick={() => setJoinRoomPopup(false)}
                className="flex-1 cursor-pointer rounded-lg border border-slate-700 py-3 text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!username.trim()) {
                    setUsernameError("Username is required");

                    setTimeout(() => {
                      setUsernameError("");
                    }, 3000);
                    return;
                  }

                  setUsernameError("");

                  const room = await joinRoom(joinCode, username);
                  if (room) {
                    navigate(`/room/${room._id}`);
                  }
                }}
                disabled={joinRoomLoading}
                className="flex flex-1 items-center justify-center rounded-lg bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-400 cursor-pointer"
              >
                {joinRoomLoading ? (
                  <SyncLoader size={6} color="#fff" />
                ) : (
                  "Join"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {createRoomPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setCreateRoomPopup(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-100">
                Create a Room
              </h2>

              <button
                onClick={() => setCreateRoomPopup(false)}
                className="cursor-pointer text-2xl text-slate-400 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Choose a username before creating your room.
            </p>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-6 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
            />

            {usernameError && (
              <p className="mt-2 text-sm text-red-500">{usernameError}</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setCreateRoomPopup(false)}
                className="flex-1 cursor-pointer rounded-lg border border-slate-700 py-3 text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!username.trim()) {
                    setUsernameError("Username is required");

                    setTimeout(() => {
                      setUsernameError("");
                    }, 3000);
                    return;
                  }

                  setUsernameError("");

                  const room = await createRoom(username);

                  if (room) {
                    setCreateRoomPopup(false);
                    navigate(`/room/${room._id}`);
                  }
                }}
                disabled={createRoomLoading}
                className="flex flex-1 items-center justify-center rounded-lg bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-400 cursor-pointer"
              >
                {createRoomLoading ? (
                  <SyncLoader size={6} color="#fff" />
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Hero;
