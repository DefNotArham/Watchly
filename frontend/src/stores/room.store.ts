import { create } from "zustand";

import api from "../lib/api";
import axios from "axios";

type UserType = {
  _id: string;
  clientId: string;
  username: string;
};

type RoomType = {
  _id: string;
  owner: UserType;
  users: UserType[];
  joinCode: string;
  videoId: string;
  currentTime: number;
  isPlaying: boolean;
};

type MessageType = {
  _id: string;
  content: string;
  sender: UserType;
  roomId: string;
  // Set by Mongoose `timestamps` on the Message model, so both the
  // load-messages response and the socket payload already carry it.
  createdAt: string;
};

type RoomStoreType = {
  currentRoom: RoomType | null;
  messages: MessageType[];

  updateParticipants: (users: UserType[]) => void;
  updateVideoId: (videoId: string) => void;
  updateVideoState: (currentTime: number, isPlaying: boolean) => void;
  addMessage: (message: MessageType) => void;

  // Loading
  createRoomLoading: boolean;
  loadRoomLoading: boolean;
  joinRoomLoading: boolean;

  // Errors
  joinRoomError: string | null;

  // functions
  createRoom: (username: string) => Promise<RoomType | null>;
  loadRoom: (roomId: string) => Promise<RoomType | null>;
  joinRoom: (joinCode: string, username: string) => Promise<RoomType | null>;
  sendMessage: (content: string, roomId: string) => Promise<void>;
  loadMessages: (roomId: string) => Promise<void>;
};

const useRoomStore = create<RoomStoreType>((set) => ({
  currentRoom: null,
  messages: [],

  updateParticipants(users: UserType[]) {
    set((state) => ({
      currentRoom: state.currentRoom
        ? {
            ...state.currentRoom,
            users,
          }
        : null,
    }));
  },

  updateVideoState(currentTime: number, isPlaying: boolean) {
    set((state) => ({
      currentRoom: state.currentRoom
        ? {
            ...state.currentRoom,
            currentTime,
            isPlaying,
          }
        : null,
    }));
  },

  updateVideoId(videoId: string) {
    set((state) => ({
      currentRoom: state.currentRoom
        ? {
            ...state.currentRoom,
            videoId,
          }
        : null,
    }));
  },

  addMessage(message: MessageType) {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  // Loading
  createRoomLoading: false,
  loadRoomLoading: false,
  joinRoomLoading: false,

  // Errors
  joinRoomError: null,

  createRoom: async (username: string) => {
    set({ createRoomLoading: true });

    try {
      const clientId = localStorage.getItem("clientId");

      if (!clientId) {
        console.log("No clientId found");
        return;
      }

      const response = await api.post("/room/create-room", {
        clientId,
        username,
      });

      if (response.data.success) {
        set({
          currentRoom: response.data.room,
          createRoomLoading: false,
        });
      }

      return response.data.room;
    } catch (error) {
      console.log(error);
      set({ createRoomLoading: false });
    }
  },

  loadRoom: async (roomId: string) => {
    set({ loadRoomLoading: true });

    try {
      const clientId = localStorage.getItem("clientId");

      if (!clientId) {
        console.log("No clientId found");
        return null;
      }

      const response = await api.get("/room/load-room", {
        params: {
          roomId,
          clientId,
        },
      });

      if (response.data.success) {
        const room = response.data.room;

        set({
          currentRoom: room,
          loadRoomLoading: false,
        });

        return room;
      }

      return null;
    } catch (error) {
      console.log(error);
      set({ loadRoomLoading: false });
      return null;
    }
  },

  joinRoom: async (joinCode: string, username: string) => {
    set({ joinRoomLoading: true, joinRoomError: null });
    try {
      const clientId = localStorage.getItem("clientId");

      if (!clientId) {
        console.log("No clientId found");
        return null;
      }

      const response = await api.post("/room/join-room", {
        clientId,
        joinCode,
        username,
      });

      if (response.data.success) {
        const room = response.data.room;
        set({ currentRoom: room, joinRoomLoading: false });

        return room;
      }

      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        set({
          joinRoomError: error.response?.data?.message,
          joinRoomLoading: false,
        });
      }
    }

    setTimeout(() => {
      set({ joinRoomError: null });
    }, 3000);
  },

  sendMessage: async (content: string, roomId: string) => {
    try {
      const clientId = localStorage.getItem("clientId");

      if (!clientId) {
        console.log("No clientId found");
        return;
      }

      await api.post("/message/send-message", {
        content,
        roomId,
        clientId,
      });

      // set((state) => ({
      //   messages: [...state.messages, response.data.newMessage],
      // }));
    } catch (error) {
      console.log(error);
    }
  },

  loadMessages: async (roomId: string) => {
    try {
      const response = await api.get(`/message/load-messages/${roomId}`);
      set(() => ({
        messages: response.data.messages,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useRoomStore;
