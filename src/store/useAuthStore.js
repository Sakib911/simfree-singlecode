import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  onboardedUser: {
    email: "",
    password: "",
  },
  updateUser: (userData) =>
    set((state) => ({
      user: userData,
    })),
  setOnboardedUser: (data) =>
    set((state) => ({
      onboardedUser: data,
    })),
}));

export default useAuthStore;
