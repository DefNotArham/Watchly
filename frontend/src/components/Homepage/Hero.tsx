import { useNavigate } from "react-router-dom";
import useRoomStore from "../../stores/room.store";

const Hero = () => {
  const { createRoom, createRoomLoading, currentRoom } = useRoomStore();
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm tracking-[0.3em] text-blue-500">Watchly</p>

      <h1 className="font-title mt-5 text-7xl text-slate-100 md:text-8xl">
        Watch Youtube
        <br />
        <span className="text-blue-500">Together.</span>
      </h1>

      <p className="mt-6 max-w-xl text-slate-400">
        A shared space for watching, chatting, and enjoying videos together.
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={async () => {
            await createRoom();

            if (currentRoom) {
              navigate(`/room/:${currentRoom._id}`);
            }
          }}
          className="cursor-pointer rounded-full bg-blue-500 px-7 py-3 font-semibold text-white transition hover:bg-blue-400"
        ></button>

        <button className="cursor-pointer rounded-full border border-slate-700 px-7 py-3 text-slate-100 transition hover:bg-slate-900">
          Join Room
        </button>
      </div>
    </main>
  );
};

export default Hero;
