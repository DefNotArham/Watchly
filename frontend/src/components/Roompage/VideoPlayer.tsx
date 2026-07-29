const VideoPlayer = () => (
  <div className="flex aspect-video items-center justify-center rounded-xl border border-slate-800 bg-black">
    <div className="text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-3xl">
        ▶
      </div>

      <h2 className="mt-5 text-2xl font-semibold">Waiting for video</h2>

      <p className="mt-2 text-slate-400">Start a video to watch together.</p>
    </div>
  </div>
);

export default VideoPlayer;
