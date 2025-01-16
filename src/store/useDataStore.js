import { create } from "zustand";

const useDataStore = create((set) => ({
  statusBarColor: "#F6F6F6",
  setStatusBarColor: (color) =>
    set((state) => ({
      statusBarColor: color,
    })),
}));

export default useDataStore;
