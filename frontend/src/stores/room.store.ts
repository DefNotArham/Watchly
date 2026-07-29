import { create } from "zustand";

import api from "../lib/api";

type RoomType = {
  _id: string;
  owner: string;
  users: string[];
  joinCode: string;
};

type RoomStoreType = {
  Room: RoomType | null;
};

const useRoomStore = create((set) => ({
  Room: null,

  createRoom: async () => {
    let clientId = localStorage.getItem("clientId");

    try {
    } catch (error) {}
  },
}));
