import YouTube from "react-youtube";

type Props = {
  videoId?: string | null;
};

const VideoPlayer = ({ videoId }: Props) => {
  if (!videoId) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center rounded-xl border border-slate-800 bg-black">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-3xl">
            ▶
          </div>

          <h2 className="mt-5 text-2xl font-semibold">Waiting for video</h2>

          <p className="mt-2 text-slate-400">
            Waiting for the owner to load a video.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 items-center justify-center rounded-xl border border-slate-800 bg-black overflow-hidden">
      <YouTube
        videoId={videoId}
        className="h-full w-full"
        iframeClassName="h-full w-full"
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
