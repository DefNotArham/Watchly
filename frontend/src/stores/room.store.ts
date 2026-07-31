import { create } from "zustand";

import api from "../lib/api";

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
};

type RoomStoreType = {
  currentRoom: RoomType | null;

  // Loading
  createRoomLoading: boolean;
  loadRoomLoading: boolean;

  createRoom: () => Promise<RoomType | null>;
  loadRoom: (roomId: string) => Promise<RoomType | null>;
};

const useRoomStore = create<RoomStoreType>((set) => ({
  currentRoom: null,

  // Loading
  createRoomLoading: false,
  loadRoomLoading: false,

  createRoom: async () => {
    set({ createRoomLoading: true });

    try {
      const clientId = localStorage.getItem("clientId");

      if (!clientId) {
        console.log("No clientId found");
        return;
      }

      const response = await api.post("/room/create-room", {
        clientId,
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
}));

export default useRoomStore;
