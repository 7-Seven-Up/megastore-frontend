import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  showDeleted: boolean;
  setShowDeleted: (showDeleted: boolean) => void;
};

export const useSizesStore = create<Store>()(
  persist(
    (set) => ({
      showDeleted: false,
      setShowDeleted: (showDeleted: boolean) => {
        set({ showDeleted });
      },
    }),
    {
      name: "sizes-storage",
    },
  ),
);
