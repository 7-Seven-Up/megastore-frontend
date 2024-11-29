import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  showDeleted: boolean;
  setShowDeleted: (showDeleted: boolean) => void;
};

export const useCategoriesStore = create<Store>()(
  persist(
    (set) => ({
      showDeleted: false,
      setShowDeleted: (showDeleted: boolean) => {
        set({ showDeleted });
      },
    }),
    {
      name: "categories-storage",
    },
  ),
);
