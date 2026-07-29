import { create } from "zustand";

import api from "../lib/api";

type UserType = {
  _id: string;
  clientId: string;
  username: string;
};

type UserStoreType = {
  user: UserType | null;
  initializeUser: () => Promise<void>;
};

const useUserStore = create<UserStoreType>((set) => ({
  user: null,

  initializeUser: async () => {
    try {
      let clientId = localStorage.getItem("clientId");

      if (!clientId) {
        clientId = crypto.randomUUID();
        localStorage.setItem("clientId", clientId);
      }

      const response = await api.post("/user/initialize-user", { clientId });

      if (response.data.success) {
        set({
          user: response.data.user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useUserStore;
