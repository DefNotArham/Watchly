const VideoInput = () => (
  <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
    <h2 className="mb-3 text-lg font-semibold">Add YouTube Video</h2>

    <div className="flex gap-3">
      <input
        placeholder="Paste YouTube link..."
        className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
      />

      <button className="cursor-pointer rounded-lg bg-blue-500 px-6 font-medium hover:bg-blue-400">
        Load
      </button>
    </div>
  </div>
);

export default VideoInput;
