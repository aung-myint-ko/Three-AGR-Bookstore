import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id) => {
        set({ userId: id });
      },

      cleanUserId: () => {
        set({ userId: null });
      },
    }),
    { name: "auth" }
  )
);
