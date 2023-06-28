import { create } from "zustand";

export const useToastStore = create((set) => ({
  show: false,
  status: null,
  message: null,
  setToast: (data) => {
    set({
      show: true,
      status: data.status,
      message: data.message,
    });
  },
  cleanToast: () => {
    set({ show: false, status: null, message: null });
  },
}));
