const RoomHeader = () => (
  <header className="border-b border-slate-800">
    <div className="flex items-center justify-between px-6 py-5 md:px-12">
      <div>
        <h1 className="font-title text-3xl">Watchly</h1>

        <p className="text-sm text-slate-400">
          Room Code: <span className="font-semibold text-blue-500">A7X9K</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-900">
          Copy Invite
        </button>

        <button className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-500">
          Leave Room
        </button>
      </div>
    </div>
  </header>
);

export default RoomHeader;
