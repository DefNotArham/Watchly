import { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import type { YouTubePlayer } from "react-youtube";
import useRoomStore from "../../stores/room.store";
import socket from "../../lib/socket.io";

type Props = {
  videoId?: string | null;
  currentTime?: number;
  isPlaying?: boolean;
};

const VideoPlayer = ({ videoId, currentTime, isPlaying }: Props) => {
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const updateVideoState = useRoomStore((state) => state.updateVideoState);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const lastTimeRef = useRef(0);

  const roomId = currentRoom?._id;
  const clientId = localStorage.getItem("clientId");

  const isOwner = currentRoom?.owner.clientId === clientId;

  useEffect(() => {
    socket.on("video-play", ({ currentTime }) => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime, true);
        playerRef.current.playVideo();
        updateVideoState(currentTime, true);
      }
    });

    socket.on("video-pause", ({ currentTime }) => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime, true);
        playerRef.current.pauseVideo();
        updateVideoState(currentTime, false);
      }
    });

    socket.on("video-seek", ({ currentTime }) => {
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime, true);
        updateVideoState(currentTime, currentRoom?.isPlaying ?? false);
      }
    });

    return () => {
      socket.off("video-play");
      socket.off("video-pause");
      socket.off("video-seek");
    };
  }, [currentRoom?.isPlaying, updateVideoState]);

  useEffect(() => {
    if (!isOwner) return;

    const interval = setInterval(() => {
      if (!playerRef.current) return;

      const currentTime = playerRef.current.getCurrentTime();

      if (Math.abs(currentTime - lastTimeRef.current) > 3) {
        socket.emit("video-seek", {
          roomId,
          currentTime,
        });
      }

      lastTimeRef.current = currentTime;
    }, 1000);

    return () => clearInterval(interval);
  }, [isOwner, roomId]);

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
    <div className="flex h-full min-h-0 items-center justify-center rounded-xl border border-slate-800 bg-black overflow-hidden relative">
      <YouTube
        key={videoId}
        videoId={videoId}
        onReady={(event) => {
          playerRef.current = event.target;

          if (currentTime !== undefined) {
            event.target.seekTo(currentTime, true);
          }

          setTimeout(() => {
            if (isPlaying === true) {
              event.target.playVideo();
            }

            if (isPlaying === false) {
              event.target.pauseVideo();
            }
          }, 500);
        }}
        onStateChange={(event) => {
          if (!isOwner) return;

          if (event.data === 1) {
            socket.emit("video-play", {
              roomId,
              currentTime: playerRef.current?.getCurrentTime(),
            });
          }

          if (event.data === 2) {
            socket.emit("video-pause", {
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
            autoplay: 0,
            controls: isOwner ? 1 : 0,
            disablekb: isOwner ? 0 : 1,
          },
        }}
      />

      {!isOwner && <div className="absolute inset-0 z-10" />}
    </div>
  );
};

export default VideoPlayer;
