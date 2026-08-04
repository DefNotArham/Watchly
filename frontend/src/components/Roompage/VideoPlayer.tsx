import { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import type { YouTubePlayer } from "react-youtube";
import useRoomStore from "../../stores/room.store";
import socket from "../../lib/socket.io";

type Props = {
  videoId?: string | null;
};

const VideoPlayer = ({ videoId }: Props) => {
  const currentRoom = useRoomStore((state) => state.currentRoom);

  const playerRef = useRef<YouTubePlayer | null>(null);

  const roomId = currentRoom?._id;
  const clientId = localStorage.getItem("clientId");

  const isOwner = currentRoom?.owner.clientId === clientId;

  useEffect(() => {
    socket.on("video-play", ({ currentTime }) => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime, true);
        playerRef.current.playVideo();
      }
    });

    return () => {
      socket.off("video-play");
    };
  }, []);

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
        key={videoId}
        videoId={videoId}
        onReady={(event) => {
          playerRef.current = event.target;
        }}
        onStateChange={(event) => {
          if (!isOwner) return;

          if (event.data === 1) {
            socket.emit("video-play", {
              roomId,
              currentTime: playerRef.current?.getCurrentTime(),
            });
          }
        }}
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
