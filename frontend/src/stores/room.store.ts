import { create } from "zustand";

import api from "../lib/api";

type RoomType = {
  _id: string;
  owner: string;
  users: string[];
  joinCode: string;
};

type RoomStoreType = {
  currentRoom: RoomType | null;
  createRoom: () => Promise<void>;
};

const useRoomStore = create<RoomStoreType>((set) => ({
  currentRoom: null,

  createRoom: async () => {
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
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useRoomStore;
