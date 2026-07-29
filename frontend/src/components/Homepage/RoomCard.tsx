type RoomCardProps = {
  title: string;
  host: string;
  viewers: number;
};

const RoomCard = ({ title, host, viewers }: RoomCardProps) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
    <div className="flex aspect-video items-center justify-center rounded-lg bg-black">
      <span className="text-3xl text-slate-700">▶</span>
    </div>

    <h3 className="mt-4 font-semibold text-slate-100">{title}</h3>

    <div className="mt-2 flex justify-between text-sm text-slate-400">
      <span>hosted by {host}</span>

      <span>👥 {viewers}</span>
    </div>

    <button className="mt-4 w-full cursor-pointer rounded-lg border border-slate-700 py-2 text-sm text-slate-100 hover:bg-slate-800">
      Join Room
    </button>
  </div>
);

export default RoomCard;
