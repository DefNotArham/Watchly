import { useState } from "react";
import useRoomStore from "../../stores/room.store";

import { FaCrown } from "react-icons/fa6";

type ChatPanelProps = {
  roomId: string;
};

const ChatPanel = ({ roomId }: ChatPanelProps) => {
  const [activeTab, setActiveTab] = useState<"chat" | "users">("chat");
  const [message, setMessage] = useState("");

  const currentRoom = useRoomStore((state) => state.currentRoom);
  const sendMessage = useRoomStore((state) => state.sendMessage);
  const messages = useRoomStore((state) => state.messages);

  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-slate-800 bg-slate-900">
      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab("chat")}
          className={`cursor-pointer flex-1 py-3 text-sm ${
            activeTab === "chat"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-slate-400"
          }`}
        >
          Chat
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`cursor-pointer flex-1 py-3 text-sm ${
            activeTab === "users"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-slate-400"
          }`}
        >
          Participants
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "chat" && (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message._id}>
                <span className="font-semibold text-blue-400">
                  {message.sender.username}
                </span>

                <p className="text-slate-300">{message.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-4">
            {currentRoom?.users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between rounded-lg border border-slate-800 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>{user.username}</span>
                </div>

                {currentRoom.owner._id === user._id && (
                  <FaCrown className="text-lg text-yellow-400 drop-shadow-sm" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Input */}
      {activeTab === "chat" && (
        <div className="border-t border-slate-800 p-4">
          <div className="flex gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={() => {
                if (!message.trim()) return;

                sendMessage(message, roomId);

                setMessage("");
              }}
              className="cursor-pointer rounded-lg bg-blue-500 px-5 hover:bg-blue-400"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
